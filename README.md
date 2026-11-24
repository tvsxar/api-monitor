# PulseKit

PulseKit is a REST API monitoring project. The repository contains a React client and an Express API.

## Local development

Use Node.js 24 and npm. From the repository root, run the server in one terminal:

```sh
cd server
npm ci
npm run dev
```

Verify the API at `http://127.0.0.1:3000/health`:

```sh
curl -i http://127.0.0.1:3000/health
```

The expected response is HTTP 200 with `{"status":"ok"}`.

Run the client in a second terminal:

```sh
cd client
npm ci
npm run dev
```

Open the URL printed by Vite, typically `http://localhost:5173`.

## Build

Run `npm run build` in each package directory. To run the compiled API, use `npm start` from `server/`.
