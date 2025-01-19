---
sidebar_position: 5
---

# Serving Static Files

ThanhHoaJS supports serving static files like images, CSS, and JavaScript.

### Configuration:

```typescript
const app = new ThanhHoa({
  staticDirectories: [{ path: "/static", directory: "public" }],
});
```

#### Example:

The file public/image.png will be accessible via URL: http://localhost:3000/static/image.png
