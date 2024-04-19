
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sridhar:1SMaY4HxOG5htwvy@production.vlfljpd.mongodb.net/?retryWrites=true&w=majority&appName=Production";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    db = (await client.connect()).db().;
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
module.exports = { query };
