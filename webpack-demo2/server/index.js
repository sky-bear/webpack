const express = require("express");
const app = express();
app.get("/api/user", (req, res) => {
  res.json({ name: "跨域测试" });
});
app.listen(3000);
