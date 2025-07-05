# Job Board

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Framework

This project uses the canary version of Next.js for dynamic I/O support.

## Packages

### Drizzle ORM

[Drizzle ORM](https://orm.drizzle.team/) is a TypeScript ORM for PostgreSQL.
It is a **pro** because it is full-featured, supports migrations, and offers a simple and intuitive API.

### PG

[PG](https://node-postgres.com/) is the official PostgreSQL driver for Node.js.
It is a **pro** because it is a lightweight and efficient wrapper around the PostgreSQL C API.

### @t3-oss/env-nextjs

[`@t3-oss/env-nextjs`](https://www.npmjs.com/package/@t3-oss/env-nextjs) helps manage environment variables in Next.js.
It is a **pro** because it simplifies switching between environments (e.g., development, production) and auto-loads variables from `.env` files.

### Zod

[Zod](https://zod.dev/) is a TypeScript-first schema validation library.
It is a **pro** because it is powerful, flexible, and type-safe — catching errors at compile time instead of runtime.

## Getting Started

### Development Server

Start the development server:

```bash
npm run dev
```

### Database Commands (PostgreSQL via Drizzle)

- **Generate tables from schema:**

    ```bash
    npm run db:generate
    ```

- **Apply migrations to the actual PostgreSQL database:**

    ```bash
    npm run db:migrate
    ```

- **View and manage the database using Drizzle Studio:**

    ```bash
    npm run db:studio
    ```
