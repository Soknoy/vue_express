const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

//Get Posts

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//ADD Post

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  //   We have to attach object ID by mongdb client
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(201).send();
});

// Create Blog
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://soknoy:Soknoy010900479@oes.0zufm.mongodb.net/vue_express?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return client.db("vue_express").collection("posts");
}

module.exports = router;
