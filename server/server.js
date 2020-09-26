require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Bug Tracker API");
});

app.listen(process.env.PROJECTILE_PORT && 9000, () => {
  console.log("listening to port 9000");
});
