# docker-compose notes

Removing the volumes to reset the PostgreSQL database state: 

- docker-compose down -v 
- docker-compose up --build

Check Network Connectivity, Access the api service container and 
test connectivity to the PostgreSQL service:

- nc -zv postgres 5432

To check if the database tables are created, you can access the PostgreSQL database inside the Docker container and use psql (the PostgreSQL command-line tool) to inspect the database.
Here's how to do it:
Access the PostgreSQL Container:
docker-compose exec postgres sh
psql -U developer -d chevere
\dt


## Secrets structure pickup by docker-compose.yml

```bash
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
```

where `GOOGLE_CLIENT_ID` is a file that hold a value
