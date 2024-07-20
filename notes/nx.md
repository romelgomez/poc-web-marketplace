# NX notes

## Check the affected

```bash
npx nx affected --base=main --head=HEAD -t build
```

## Build All Projects:

```bash
nx run-many --target=build --all
```


## NX how to setting in a existing project a mono repo

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