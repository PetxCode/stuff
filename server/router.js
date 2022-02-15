const express = require("express");
const Model = require("./model");
const router = express.Router();

router.get("/", async (req, res) => {
  const getNames = await Model.find();
  res.status(200).json({ message: "found", data: getNames });
});

router.post("/", async (req, res) => {
  const getNames = await Model.create(req.body);
  res.status(200).json({ message: "found", data: getNames });
});

router.delete("/:id", async (req, res) => {
  const deleterData = await Model.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: "deleted" });
});

module.exports = router;
