import express from "express";
import cors from "cors";
import fs from "fs";
import { uuid } from "uuidv4";
const app = express();
app.use(cors());
app.use(express.json());
let arr = [];
app.get("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync("db.json"));
  response.json(arr);
});

app.post("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync("db.json"));
  arr.push({
    datas: request.body,
    id: uuid(),
  });
  fs.writeFileSync("db.json", JSON.stringify(arr));
  response.send(arr);
});

app.delete("/:id", (request, response) => {
  const id = request.params.id;
  arr = JSON.parse(fs.readFileSync("db.json"));
  arr = arr.filter((el) => el.id !== id);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  response.send(arr);
});

app.put("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync("db.json"));
  const newData = request.body;
  console.log(newData);
  for (let j = 0; j < arr.length; j++) {
    if (newData.userID == arr[j].id) {
      arr[j].datas.name = newData.name;
      arr[j].datas.age = newData.age;
      break;
    }
  }
  fs.writeFileSync("db.json", JSON.stringify(arr));
  response.send(arr);
});

app.listen(2222, () => {
  console.log(`2222 hello`);
});
