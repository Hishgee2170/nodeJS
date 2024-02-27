import express from "express";
import cors from "cors";
import fs from "fs";
import { uuid } from "uuidv4";
const app = express();
app.use(cors());
app.use(express.json());
let arr = [];
const DATA_BASE = "db.json";
const PORT = 2222;
app.get("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  response.json(arr);
});

app.post("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  arr.push({
    datas: request.body,
    id: uuid(),
  });
  fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(arr));
  response.send(arr);
});

app.delete("/:id", (request, response) => {
  const id = request.params.id;
  arr = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  arr = arr.filter((el) => el.id !== id);
  fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(arr));
  response.send(arr);
});

app.put("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  const newData = request.body;
  console.log(newData);
  arr.map((el) => {
    if (newData.userID == el.id) {
      el.datas.name = newData.name;
      el.datas.age = newData.age;
    }
  });
  fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(arr));
  response.send(arr);
});

app.listen(PORT, () => {
  console.log("PORT:" + PORT);
});
