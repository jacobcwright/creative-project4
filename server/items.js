const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const listItemSchema = new mongoose.Schema({
    type: String,
    text: String
});

const listItem = mongoose.model("listItem", listItemSchema);

router.get('/', async (req, res) => {
    try {
      let list = await listItem.find();
      res.send(list);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  router.post('/', async (req, res) => {
    const item = new listItem({
      type: req.body.type,
      text: req.body.text
    });
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  // router.delete('/:id', auth.verifyToken, async (req, res) => {
  //     try {
  //     await listItem.deleteOne({
  //       _id: req.params.id
  //     });
  //     res.sendStatus(200);
  //   } catch (error) {
  //     console.log(error);
  //     res.sendStatus(500);
  //   }
  // });

  router.delete('/todo', auth.verifyToken, async (req, res) => {
    console.log('in delete todo');
    try {
    await listItem.deleteMany({
      "type": "Todo"
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/note', auth.verifyToken, async (req, res) => {
  console.log('in delete note');
  try {
  await listItem.deleteMany({
    type: "Note"
  });
  res.sendStatus(200);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});

router.delete('/goal', auth.verifyToken, async (req, res) => {
  console.log('in delete goal');
  try {
  await listItem.deleteMany({
    type: "Goal"
  });
  res.sendStatus(200);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});

router.delete('/gratitude', auth.verifyToken, async (req, res) => {
  console.log('in delete gratitude');
  try {
  await listItem.deleteMany({
    type: "Gratitude"
  });
  res.sendStatus(200);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});
  
  module.exports = router;