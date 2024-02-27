import express from "express";
import cors from "cors";
import fs from "fs";
import { uuid } from "uuidv4";
const app = express();
app.use(cors());
app.use(express.json());
let DATA = [];
const DATA_BASE = "db.json";
const PORT = 2222;
app.get("/", (request, response) => {
  DATA = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  response.json(DATA);
});

app.post("/", (request, response) => {
  const DATA_CHECK = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  DATA = JSON.parse(fs.readFileSync(`${DATA_BASE}`));

  DATA.push({
    datas: request.body,
    id: uuid(),
  });
  fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(DATA));
  if (DATA.length > DATA_CHECK.length) {
    response.send(DATA);
    response
      .status(201)
      .send({ success: true, message: "Data posted ", newData });
  } else {
    response
      .status(500)
      .send({ success: false, message: "Failed to post data" });
  }
});

app.delete("/:id", (request, response) => {
  let deleted = false;
  DATA = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  DATA = DATA.filter((el) => {
    if (el.id === request.params.id) {
      deleted = true;
      return false;
    }
    return true;
  });
  if (deleted) {
    fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(DATA));
    response.send(DATA);
    response.send({ success: true, message: "Data deleted " });
  } else {
    response.status(404).send({ success: false, message: "Data not found" });
  }
});

app.put("/", (request, response) => {
  let updated = false;
  DATA = JSON.parse(fs.readFileSync(`${DATA_BASE}`));
  DATA.map((el) => {
    if (request.body.userID == el.id) {
      el.datas.name = request.body.name;
      el.datas.age = request.body.age;
      updated = !updated;
    }
  });
  if (updated) {
    fs.writeFileSync(`${DATA_BASE}`, JSON.stringify(DATA));
    response.send(DATA);
    response.send({ success: true, message: "Data updated " });
  } else {
    response.status(404).send({ success: false, message: "Data not found" });
  }
});

app.listen(PORT, () => {
  console.log("PORT:" + PORT);
});
