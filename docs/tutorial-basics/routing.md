---
sidebar_position: 2
---

# Routing

**Routing** is one of the core features of ThanhHoaJS Framework. You can easily define routes to handle different HTTP requests.

### Supported HTTP Methods:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

### Example:

```typescript
import ThanhHoa from "@thanhhoajs/thanhhoa";

const app = new ThanhHoa();

app.get("/hello", (context) => {
  return new Response("Hello, World!");
});

app.post("/submit", async (context) => {
  const data = await context.request.json();
  return new Response(JSON.stringify(data), { status: 201 });
});

app.listen({ port: 3000 });
```

### Middleware in Routing:

You can add middleware to specific routes or apply it globally.

```typescript
app.use((context, next) => {
  console.log("Middleware running before request handling");
  return next();
});

app.get("/protected", (context) => {
  return new Response("You have accessed a protected route");
});
```
