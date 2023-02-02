const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const {
  readData,
  writeData,
  pushGroup,
  duplicate,
} = require("./helpers/helper");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ status: "Active" });
});

app.get("/api/data", (req, res) => {
  const data = readData();
  res.send(data);
});

app.post("/api/data", (req, res) => {
  writeData(req.body);
  const data = readData();
  res.send(data);
});

app.get("/api/data/download", (req, res) => {
  res.download("../pane.json", "pane.json");
});

/* Panes */
app.get("/api/panes", (req, res) => {
  res.send({ status: "Active" });
});

/* Add a group */
/* app.post("/api/data/group", (req, res) => {
  if (!req.body.order) {
    return res.status(400).send({ message: "order is required" });
  }
  if (req.body.order.length !== Object.keys(req.body).length - 1) {
    return res
      .status(400)
      .send({ message: "order and panes lenght must be thesame" });
  }

  const data = pushGroup(req.body);
  res.send(data);
}); */

/* Duplicate */
app.post("/api/data/pane/:paneId", (req, res) => {
  const newData = duplicate(req.params.paneId, req.query.indexOfOrder);
  res.send(newData);
});

/* Edit pane */
app.put("/api/groups/:groupId/pane/:paneId", (req, res) => {
  res.send({ status: "Active" });
});

app.delete("/api/groups/:groupId/pane/:paneId", (req, res) => {
  res.send({ status: "Active" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
