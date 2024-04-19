
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
  console.log(1)
    
}
// run().catch(console.dir);

