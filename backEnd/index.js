import express, { response } from "express";
import cors from "cors";
import fs from "fs";
const app = express();
app.use(cors());
app.use(express.json());
let arr = [];

app.get("/", (request, response) => {
  if (request) {
    response.json(arr);
  }
});

app.post("/", (request, response) => {
  arr = JSON.parse(fs.readFileSync("db.json"));
  arr.push(request.body);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  console.log(arr);
  response.send(arr);
});

app.delete("/", (request, response) => {
  let index = request.body;
  arr = JSON.parse(fs.readFileSync("db.json"));
  arr.splice(index, 1);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  console.log(arr);
  response.send(arr);
});

// app.put("/", (request, response) => {
//   arr = JSON.parse(fs.readFileSync("db.json"));
//   arr[request.body.index].name = request.body.name;
//   arr[request.body.index].age = request.body.age;
//   fs.writeFileSync("db.json", JSON.stringify(arr));
//   response.send(arr);
// });

app.listen(3000, () => {
  console.log(`3000 hello`);
});
