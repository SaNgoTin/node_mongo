const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connected correctly to server");

  const db = client.db(dbname);
  const collection = db.collection("dishes");
  collection.insertOne(
    { name: "Pizza", description: "Pizza Hub" },
    (err, result) => {
      assert.equal(err, null);

      console.log("After insert:");
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("found: \n");
        console.log(docs);
        client.close();
      });
    }
  );
});
