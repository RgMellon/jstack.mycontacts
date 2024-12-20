const express = require("express");

const app = express();

app.get("/", (reques, response) => {
  response.send({ ok: true });
});

app.listen(3000, () => {
  console.log("Online");
});
