const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const url = "mongodb://localhost/LetStart";
const url_online =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

io.on("connection", (socket) => {
  console.log("we are ready to connect: ", socket.id);
});

mongoose.connect(url_online).then(() => {
  console.log("Database connected");
});
const db = mongoose.connection;

app.use(cors());
app.use(express.json());

app.use("/", require("./router"));

db.on("open", () => {
  const dbConnect = db.collection("changers").watch();

  dbConnect.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const newChange = {
        _id: change.fullDocument._id,
        name: change.fullDocument.name
      };
      io.emit("observer", newChange);
    }
  });
});

server.listen(2233, () => {
  console.log("Let do this on: 2233");
});
