---
sidebar_position: 1
---

# Introduction

**ThanhHoaJS Framework** is a lightweight, high-performance web framework designed for building web applications and APIs quickly and efficiently. It supports features like routing, middleware, caching, and more.

### Key Features:

- **Routing**: Supports HTTP methods like GET, POST, PUT, PATCH, DELETE.
- **Middleware**: Easily integrate middleware such as CORS, Helmet, Rate Limiting, Compression, and Cache.
- **Caching**: Supports caching with LRU Cache and Redis.
- **Static File Serving**: Efficiently serve static files.

### Initialize the App:

```typescript
import { ThanhHoa, type IRequestContext } from '@thanhhoajs/thanhhoa';

const app = new ThanhHoa();

app.get('/', (ctx: IRequestContext) => {
  return new Response('Hello, ThanhHoa!', {
    headers: { 'Content-Type': 'text/plain' },
  });
});

app.listen({ port: 3000 });
```

### Run the App:

```bash
bun start
```

Visit http://localhost:3000 to see the result.
