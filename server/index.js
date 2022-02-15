const getRouter = require("./router");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");

const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

const url =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

io.on("connection", (socket) => {
  console.log("live server connected on: ", socket.id);
});

mongoose.connect(url).then(() => {
  console.log("database connected");
});

const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use("/", getRouter);

db.on("open", () => {
  const dbConnect = db.collection("changers").watch();

  dbConnect.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const newData = {
        _id: change.fullDocument._id,
        name: change.fullDocument.name
      };
      io.emit("observer", newData);
    } else if (change.operationType === "delete") {
      io.emit("observerDelete", change);
    }
  });
});

server.listen(9900, () => {
  console.log("server is connected 9900");
});
