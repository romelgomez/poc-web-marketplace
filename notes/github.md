To check and set the permissions for the `GITHUB_TOKEN` in your GitHub Actions workflow, follow these steps:

### Checking and Setting GitHub Token Permissions

1. **Navigate to Repository Settings**:
   - Go to your GitHub repository.
   - Click on the `Settings` tab.

2. **Access Actions Settings**:
   - In the left sidebar, click on `Actions`.
   - Under `Actions`, click on `General`.

3. **Set Token Permissions**:
   - Scroll down to the `Workflow permissions` section.
   - Ensure that `Read and write permissions` is selected.
   - Also, make sure `Allow GitHub Actions to create and approve pull requests` is checked if needed.

### Example of a GitHub Actions Workflow with Correct Permissions

Here's how you can ensure your workflow includes the correct permissions for the GitHub token:

```yaml
name: API CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read
  packages: write

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Generates the Prisma Client based schema definition in schema.prisma
        run: npx prisma generate --schema apps/api/prisma/schema.prisma

      - name: Build with npx
        run: npx nx build api

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker images
        run: |
          docker buildx build --platform linux/amd64 -t ghcr.io/${{ github.repository_owner }}/maryline:latest --push -f apps/api/Dockerfile .
```

