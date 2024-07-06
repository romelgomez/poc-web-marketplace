The issue you're experiencing suggests that Prisma migrations did not apply the schema changes to your database. Here's a step-by-step approach to troubleshoot and resolve the issue:

1. **Ensure Migrations are Up-to-date:**
   Make sure your Prisma migrations are properly set up and that the `prisma migrate deploy` command is executed without errors.

2. **Check Database URL:**
   Confirm that the `DATABASE_URL` in your environment variables is correctly set. The format should be:
   ```
   postgres://developer:developer@postgres:5432/chevere?schema=public
   ```

3. **Apply Migrations:**
   Run the following commands to ensure migrations are created and applied:

   ```sh
   npx prisma migrate dev --name init  # Generates migration files
   npx prisma migrate deploy           # Applies the migrations to the database
   ```

4. **Check Logs:**
   If the above commands don't work as expected, check the logs for any errors during the migration process.

5. **Inspect Migration Files:**
   Ensure that your migration files exist and contain the correct SQL statements to create the necessary tables.

### Step-by-step Troubleshooting

1. **Ensure Migrations are Created:**
   Create migration files if they don't already exist:
   ```sh
   npx prisma migrate dev --name init
   ```

2. **Apply Migrations:**
   Apply the migrations to the database:
   ```sh
   npx prisma migrate deploy
   ```

3. **Check for Errors:**
   If there are any errors during the above commands, investigate and resolve them. For example, if there are issues with the database connection or schema, address those first.

4. **Verify Tables:**
   After successfully applying migrations, check the tables again in the PostgreSQL database:
   ```sh
   docker-compose exec postgres sh
   psql -U developer -d chevere
   \dt
   ```

### Example of Docker Setup and Running Prisma Migrations

```sh
# Ensure your Docker containers are running
docker-compose up -d

# Run the migrations
npx prisma migrate dev --name init
npx prisma migrate deploy

# Verify the tables in PostgreSQL
docker-compose exec postgres sh
psql -U developer -d chevere
\dt
```

By following these steps, you should be able to create and apply the necessary migrations to ensure your tables are created in the PostgreSQL database. If you encounter any specific errors during this process, please share them, and I can help troubleshoot further.