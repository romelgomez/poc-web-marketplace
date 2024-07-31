# API

```bash
npx nx build api
npx nx build api  --configuration=production
npx nx serve api
nx show project api --web
```

## Server

production

```bash
npx nx serve api  --configuration=production
# nx run api:serve:production
```

develoment

```bash
npx nx serve api
# nx run api:serve:development
```

## Docker

test steps

```bash
npx nx build api

docker-compose down -v

docker build --progress=plain --no-cache -t maryline/api:0.0.1 -f apps/api/Dockerfile .

docker-compose up --build
```

## Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
node dist/apps/api/main.js
```

docker-compose -f docker-compose.api.yml up


<!-- "start:migrated": "npx prisma generate && npx prisma migrate dev --name init && npx prisma migrate deploy && node dist/apps/api/main.js"  -->
