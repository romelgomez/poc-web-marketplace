# Proof of Concept - Web Marketplace 

- A nx.dev monorepo
- Graphql API
- NextJS Client
- Meilisearch server for fast searches
- Clerk for auth


## apps commands 

web/api

```bash
npx nx build web
npx nx dev web
npx nx start web

npx nx serve api 
```

This project depends on meilisearch server

docker

```bash
docker build --progress=plain --no-cache -t maryline/web:0.0.1 -f apps/web/Dockerfile .

docker run -p 3000:3000 maryline/web:0.0.1
```

## Images

![](/images/api.png)

![](/images/web.png)


## Clerk

after the login, clerk call this endpoint to create the user in the database.

`https://....ngrok-free.app/api/webhooks/user`

internaly we have this webhooks defined here

`apps/web/src/pages/api/webhooks/user.ts`


