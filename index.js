import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URI, { logging: false });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
