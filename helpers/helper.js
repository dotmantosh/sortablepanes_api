const fs = require("fs");

const readData = () => {
  const dataBuffer = fs.readFileSync("./pane.json");
  const dataJSON = dataBuffer.toString();
  const data = JSON.parse(dataJSON);
  return data;
};

const writeData = (payload) => {
  const data = JSON.stringify(payload);
  fs.writeFileSync("./pane.json", data);
};

const pushGroup = (group) => {
  const data = getGroups();
  data.push(group);
  writeData(data);
  return data;
};

const duplicate = (paneId, indexOfOrder) => {
  const newData = readData();
  const paneIndex = newData.findIndex((item) => item.id === paneId);
  const pane = newData[paneIndex];
  const width = pane[indexOfOrder].width / 2;
  pane[indexOfOrder].width = width;
  pane[Math.max(...pane.order) + 1] = {
    height: 100,
    width,
    content: pane[indexOfOrder].content,
  };
  const key = pane.order.indexOf(indexOfOrder);
  pane.order.splice(key + 1, 0, (Math.max(...pane.order) + 1).toString());

  return newData;
};

module.exports = { readData, writeData, pushGroup, duplicate };
