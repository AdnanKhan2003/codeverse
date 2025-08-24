import { PORT } from "./constants/env";
import { initDB } from "./lib/utils/db.utils";
import { app } from "./server";

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});
