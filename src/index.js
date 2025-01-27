import express from "express";
import gadgetsRouter from "./router/gadget.routes.js";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use(gadgetsRouter);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
