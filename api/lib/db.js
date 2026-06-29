import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = "mongodb+srv://neevachi41_db_user:<db_password>@cluster0.qjxbfpz.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Set the database reference
    db = client.db();
    
    return client;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Make sure MongoDB is running or check your MONGODB_URI in .env file');
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
};

const getClient = () => client;

export default connectDB;
export { getDB, getClient };
