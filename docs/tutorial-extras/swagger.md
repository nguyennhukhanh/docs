---
sidebar_position: 4
---

# Swagger Integration

ThanhHoaJS Framework provides built-in support for Swagger/OpenAPI documentation.

### Installation

First, install the required dependencies:

```bash
bun add swagger-jsdoc
bun add -D @types/swagger-jsdoc
```

### Basic Configuration

Create a swagger configuration file:

```typescript
// swagger-options.ts
import type { Options } from "swagger-jsdoc";

const currentDir = process.cwd();

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${currentDir}/src/modules/**/*.controller.ts`],
};
```

Initialize Swagger specification:

```typescript
// swagger-spec.ts
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger-options";

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
```

### Integration with ThanhHoaJS

In your main application file:

```typescript
import { setupSwagger, ThanhHoa } from "@thanhhoajs/thanhhoa";
import { swaggerSpec } from "./common/swagger/swagger-spec";

const app = new ThanhHoa("/api");
const docsRoute = "/docs";

// Setup Swagger UI
setupSwagger(app, docsRoute, swaggerSpec);

app.listen({ port: 3000 });
```

### Accessing Documentation

Once configured, you can access your API documentation at:

- Swagger UI: `http://your-server:port/api/docs`
- OpenAPI JSON: `http://your-server:port/api/docs/swagger.json`

### Middleware Configuration

For proper Swagger UI functionality, ensure your middleware configuration excludes the docs route:

```typescript
const applyMiddlewareIfNeeded = (
  middleware: any,
  context: IRequestContext,
  next: INextFunction
) => {
  if (!context.request.url.includes(docsRoute)) {
    return middleware()(context, next);
  }
  return next();
};

app.use((context, next) =>
  applyMiddlewareIfNeeded(corsMiddleware, context, next)
);
app.use((context, next) =>
  applyMiddlewareIfNeeded(helmetMiddleware, context, next)
);
app.use((context, next) =>
  applyMiddlewareIfNeeded(cacheMiddleware, context, next)
);
```
