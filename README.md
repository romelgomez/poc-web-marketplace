# Maryline

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Nx plugins and code generators

Add Nx plugins to leverage their code generators and automated, inferred tasks.

```
# Add plugin
npx nx add @nx/react

# Use code generator
npx nx generate @nx/react:app demo

# Run development server
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the docs.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)


## Maryline Notes 


### Check the affected

```bash
npx nx affected --base=main --head=HEAD -t build
```

### Build All Projects:

```bash
nx run-many --target=build --all
```

### API


```bash
npx nx build api
npx nx build api  --configuration=production
npx nx serve api
nx show project api --web
```

### Web client

```bash
npx nx build web


nx run web:next:build
nx run web:next:dev
nx run web:next:start
nx run web:serve-static
nx show project web --web
```


### Biome formating & lint & check

```bash
npx biome format --write . && biome lint --write . && biome check --write .


npx biome format --write .
npx biome lint --write .
npx biome format --write .
```


### NX how to setting in a existing project a mono repo


NextJS

```bash
nx add @nx/next 
nx g @nx/next:app apps/web
nx dev web
```

NestJS

```bash
nx add @nx/nest  
nx g @nx/nest:app apps/api2  
nx serve api2
nx show project api2-e2e --web
nx show project api2 --web
npx nx build api2
```

### Secrets structure pickup by docker-compose.yml

maryline/
│
├── docker-compose.yml
├── .env
├── secrets/
│   ├── GOOGLE_CLIENT_ID
│   ├── GOOGLE_CLIENT_SECRET
│   ├── DATABASE_PASSWORD
│   ├── JWT_SECRET
│   ├── JWT_EXPIRATION_TIME
│   ├── AT_SECRET
│   ├── RT_SECRET
│   ├── MEILI_KEY
│   ├── CLERK_SECRET_KEY

### To play with docker

```bash
psql -U developer -d chevere -h localhost
```