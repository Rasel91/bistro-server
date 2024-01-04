const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())



console.log(process.env.DB_USER)

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bistroBooss:TEUWOv6IKmquFuHH@cluster0.jdjqxci.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://<username>:<password>@cluster0.jdjqxci.mongodb.net/?retryWrites=true&w=majority";

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
            await client.connect();

            const menuCollection = client.db("bistroBd").collection('menu');
            const viewsCollection = client.db("bistroBd").collection('views');


            app.get('/menu', async (req, res) => {
                  const result = await menuCollection.find().toArray();
                  res.send(result)
                  // console.log(result)
            })
            app.get('/view', async (req, res) => {
                  const result = await viewsCollection .find().toArray();
                  res.send(result)
                  // console.log(result)
            })



            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
            // Ensures that the client will close when you finish/error
            //     await client.close();
      }
}
run().catch(console.dir);




app.get('/', (req, res) => {
      res.send('Bistro Sever Is running')
});

app.listen(port, () => {
      console.log(`Bistro server is Running ${port}`)
})