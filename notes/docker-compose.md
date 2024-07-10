# docker-compose notes

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
