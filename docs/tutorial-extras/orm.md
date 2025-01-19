---
sidebar_position: 3
---

# ORM

In this article, we will use [Drizzle ORM](https://orm.drizzle.team/docs/overview) for database operations. This guide covers setup and usage with MySQL.

### Installation

Install required dependencies:

```bash
bun add drizzle-orm mysql2
bun add -D drizzle-kit
```

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

### Configuration

Create `drizzle.config.ts` in your project root:

```typescript
import { type Config, defineConfig } from "drizzle-orm/mysql-core";

export default defineConfig({
  dialect: process.env.DB_TYPE as Config["dialect"],
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  },
  schema: "./src/database/schemas",
  out: "./src/database/migrations",
});
```

### Database Connection

Create `src/database/db.ts`:

```typescript
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { dbConfig } from "../configs/database.config";

const connection = mysql.createPool({
  host: dbConfig.host as string,
  port: dbConfig.port,
  user: dbConfig.username,
  database: dbConfig.database as string,
  password: dbConfig.password,
  debug: dbConfig.debug,
  timezone: "+00:00", // Set timezone to UTC
});

export const db = drizzle({
  client: connection,
  mode: "planetscale",
  casing: "camelCase",
});
```

### Schema Definition

Example schema file `src/database/schemas/users.schema.ts`:

```typescript
import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: int().primaryKey().autoincrement(),
    email: varchar({ length: 100 }).unique(),
    fullName: varchar({ length: 100 }),
    walletAddress: varchar({ length: 100 }).unique(),
    nonce: int().default(0),
    avatarUrl: varchar({ length: 255 }),
    isActive: boolean().notNull().default(true),
    createdAt: timestamp({ mode: "date" })
      .notNull()
      .$default(() => new Date()),
    updatedAt: timestamp({ mode: "date" })
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    emailIndex: uniqueIndex("emailIdx").on(table.email),
  })
);

export type User = typeof users.$inferSelect;
```

### Usage Example

Example service using Drizzle ORM:

```typescript
import { db } from "src/database/db";
import { users } from "src/database/schemas/users.schema";
import { eq } from "drizzle-orm";

export class UserService {
  async getUserByEmail(email: string): Promise<User> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0];
  }

  async createUser(dto: { email: string; fullName: string }) {
    return await db.insert(users).values(dto).$returningId();
  }
}
```

### Common Operations

1. **Select with Filters**:

```typescript
const result = await db
  .select()
  .from(users)
  .where(and(eq(users.isActive, true), like(users.email, "%@example.com")));
```

2. **Insert Records**:

```typescript
const newUser = await db.insert(users).values({
  email: "user@example.com",
  fullName: "John Doe",
});
```

3. **Update Records**:

```typescript
await db
  .update(users)
  .set({ fullName: "New Name" })
  .where(eq(users.id, userId));
```

4. **Delete Records**:

```typescript
await db.delete(users).where(eq(users.id, userId));
```
