import express from "express";
import cors from "cors";
import sequelize from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
