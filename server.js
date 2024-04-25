const express = require("express");
const { chats } = require("./Data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/db");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoutes);

app.get("/api/chats/:id", (req, res) => {
  // console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    console.log("connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("not connected");
    console.log(err);
  });
