const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("welcome to the quotes api server");
});

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
