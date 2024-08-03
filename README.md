# Maryline

A nx.dev monorepo

## apps commands 

web

```bash
npx nx build web
npx nx dev web
npx nx start web
```


docker

```bash
docker build --progress=plain --no-cache -t maryline/web:0.0.1 -f apps/web/Dockerfile .

docker run -p 3000:3000 maryline/web:0.0.1
```