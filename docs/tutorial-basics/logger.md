---
sidebar_position: 6
---

# Logger

A powerful and flexible logger designed specifically for the `@thanhhoajs` ecosystem, optimized for high performance with **Bun** and **TypeScript**.

### Installation

Install the logger using **Bun**:

```bash
bun add @thanhhoajs/logger
```

### Usage

```typescript
import { Logger } from "@thanhhoajs/logger";

// Create a logger instance with a context name
const logger = Logger.get("EXAMPLE");

// Log messages with different levels
logger.info("Application has started");
logger.warn("This is a warning");
logger.error("An error occurred!");
logger.debug("Debug information");
logger.verbose("Detailed information");
logger.success("Operation successful");
```

### Examples

#### Logging in a Web Application

```typescript
import { Logger } from "@thanhhoajs/logger";

const logger = Logger.get("APP");

app.get("/", (context) => {
  logger.info("Request received at /");
  return new Response("Hello, ThanhHoa!", {
    headers: { "Content-Type": "text/plain" },
  });
});

app.listen({ port: 3000 }, () => {
  logger.success("Server is running on http://localhost:3000");
});
```

#### Logging in a Database Module:

```typescript
import { Logger } from "@thanhhoajs/logger";

const logger = Logger.get("DATABASE");

function connectToDatabase() {
  try {
    logger.info("Connecting to the database...");
    // Database connection logic
    logger.success("Database connected successfully");
  } catch (error) {
    logger.error("Failed to connect to the database", error);
  }
}
```
