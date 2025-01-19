---
sidebar_position: 1
---

# Configuration

This guide demonstrates how to implement a complete configuration system in ThanhHoaJS Framework.

### 1. Define Configuration Structure

First, create separate configuration files for different components. Example using database config:

```typescript
import { createValidator } from "@thanhhoajs/validator";

const dbValidator = createValidator();

dbValidator.field("type").required().string();
dbValidator.field("host").required().string();
dbValidator.field("port").required().number();
dbValidator.field("username").required().string();
dbValidator.field("password").required().string();
dbValidator.field("database").required().string();
dbValidator.field("synchronize").required().boolean();
dbValidator.field("debug").required().boolean();

export const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  debug: process.env.DB_DEBUG === "true",
  timezone: "Z", // Force UTC timezone
};

export { dbValidator };
```

### 2. Implement Configuration Validation

Create a central validator to check all configurations:

```typescript
import { Logger } from "@thanhhoajs/logger";

const logger = Logger.get("Configs");

export const runValidators = async () => {
  try {
    const results = await Promise.all([
      dbValidator.validate(dbConfig),
      appValidator.validate(appConfig),
      // ... other validators
    ]);

    const allErrors = results.filter((errors) => errors.length > 0);

    if (allErrors.length > 0) {
      logger.error("Validation errors:");
      logger.trace(allErrors);
    } else {
      logger.success("All configurations are valid!");
    }
  } catch (error) {
    logger.error("An error occurred during validation:\n", error);
    process.exit(1);
  }
};
```

### 3. Using Configurations

Example of using the database configuration to set up a connection:

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

### 4. Application Startup

Validate configurations before starting your application:

```typescript
import { ThanhHoa } from "@thanhhoajs/thanhhoa";
import { runValidators } from "./configs";

// Validate all configurations
runValidators();

export async function startServer() {
  const app = new ThanhHoa(prefix);
  // ... app setup

  app.listen({
    port: appConfig.port,
    development: false,
    reusePort: true,
  });
}

void startServer();
```

### Best Practices

1. Always validate configurations before starting your application
2. Use environment variables for sensitive information
3. Provide default values when appropriate
4. Keep configurations modular and organized by feature
5. Include proper type definitions for your configurations
6. Use strong typing for configuration objects
7. Implement validation rules for all required fields
8. Handle configuration errors gracefully
