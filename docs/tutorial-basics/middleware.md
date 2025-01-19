---
sidebar_position: 3
---

# Middleware

**Middleware** are functions that execute before or after handling a request. ThanhHoaJS supports popular middleware like CORS, Helmet, Rate Limiting, Compression, and Cache.

### CORS Middleware:

```typescript
import { corsMiddleware } from "@thanhhoajs/thanhhoa";

app.use(
  corsMiddleware({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
```

### Helmet Middleware:

```typescript
import { helmetMiddleware } from "@thanhhoajs/thanhhoa";

app.use(
  helmetMiddleware({
    contentSecurityPolicy: {
      "default-src": ["'self'"],
    },
  })
);
```

### Rate Limiting Middleware:

```typescript
import { rateLimiter } from "@thanhhoajs/thanhhoa";

app.use(
  rateLimiter({
    windowMs: 60000, // 1 minute
    maxRequests: 100, // Max 100 requests per minute
  })
);
```

### Compression Middleware:

```typescript
import { compression } from "@thanhhoajs/thanhhoa";

app.use(
  compression({
    level: 6, // Compression level
  })
);
```

### Cache Middleware:

```typescript
import { cacheMiddleware } from "@thanhhoajs/thanhhoa";

app.use(cacheMiddleware());
```
