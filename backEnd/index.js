import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
app.use(cors());
app.use(express.json());
var arr = [];

app.get("/", (request, response) => {
  if (request) {
    response.json(arr);
  }
});

app.post("/", (request, response) => {
  fs.readFileSync("db.json");
  arr.push(request.body);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  // arr = JSON.parse("db.json");
  console.log(arr + "sd");
  response.send(arr);
});

app.listen(3000, () => {
  console.log(`3000 hello`);
});
