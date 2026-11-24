# PulseKit

PulseKit is a REST API monitoring project. The repository contains a React client and an Express API.

## Local development

Use Node.js 24 and npm. Set up PostgreSQL and the authentication environment variables below before starting the server. From the repository root, run the server in one terminal:

```sh
cd server
npm ci
npm run dev
```

Verify the API at `http://127.0.0.1:3000/api/health`:

```sh
curl -i http://127.0.0.1:3000/api/health
```

The expected response is HTTP 200 with `{"status":"ok"}`.

Run the client in a second terminal:

```sh
cd client
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. Vite proxies `/api` to Express so the browser can use the same origin for session cookies.

## PostgreSQL and authentication

Copy `server/.env.example` to `server/.env` and set `DATABASE_URL` to the direct connection URL from your Neon development database. Use `sslmode=verify-full` to explicitly verify the server certificate and hostname. Keep any other URL parameters supplied by Neon.

Keep `BETTER_AUTH_URL` set to `http://127.0.0.1:5173` for local development. Generate a value for `BETTER_AUTH_SECRET` with `openssl rand -base64 32` and store it in `server/.env`.

From `server/`, apply the checked-in migration to your development database, generate Prisma Client and verify the connection:

```sh
npx prisma migrate deploy
npm run db:generate
npm run db:check
```

The check runs `SELECT 1`. The `/api/health` route reports whether Express is running.

The client supports email and password sign-up, sign-in and sign-out. Better Auth manages the session cookie and provides `GET /api/auth/get-session`.

## Database migrations

For a new schema change, update `server/prisma/schema.prisma` and run `npx prisma migrate dev --name describe_change` from `server/` against your development database. Prisma uses a shadow database to check the migration history and puts the new SQL in a timestamped folder under `prisma/migrations/`.

Commit the schema and migration files together. Keep applied migrations as they are and use `npx prisma migrate deploy` to apply committed migrations to another database.

## Build

Run `npm run build` in each package directory. To run the compiled API, use `npm start` from `server/`.
