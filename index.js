const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// AhiqGawzLv9sxys5
// assignment-11

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yce18.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("travelagency");
    const servicesCollection = database.collection("services");

    // GET API
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.json(services);
    });
    // GET SINGLE DATA

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // const query = { _id: id };

      const service = await servicesCollection.findOne(query);

      res.json(service);
    });

    // POST API

    app.post("/services", async (req, res) => {
      const service = req.body;

      const result = await servicesCollection.insertOne(service);
      console.log("hit the post Api", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running the server");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
