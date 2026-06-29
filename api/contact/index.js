import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://neevachi41_db_user:<db_password>@cluster0.qjxbfpz.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db();

    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
      
      // Save to MongoDB
      const newContact = {
        name,
        email,
        message,
        createdAt: new Date()
      };
      
      const result = await db.collection('contacts').insertOne(newContact);
      
      res.status(201).json({ 
        message: 'Contact form submitted successfully',
        contact: { _id: result.insertedId, ...newContact }
      });
    } else if (req.method === 'GET') {
      const contacts = await db.collection('contacts').find({}).toArray();
      res.json(contacts);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    await client.close();
  }
}
