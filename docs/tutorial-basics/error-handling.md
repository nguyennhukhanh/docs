---
sidebar_position: 4
---

# Error Handling

ThanhHoaJS provides a robust error handling mechanism with `HttpException`.

### HttpException:

```typescript
import { HttpException } from "@thanhhoajs/thanhhoa";

app.get("/error", (context) => {
  throw new HttpException("Something went wrong!", 500);
});
```
