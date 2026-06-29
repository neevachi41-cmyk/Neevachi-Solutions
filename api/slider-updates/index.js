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

    if (req.method === 'GET') {
      const updates = await db.collection('sliderUpdates')
        .find({ isActive: true })
        .toArray();
      res.json(updates);
    } else if (req.method === 'POST') {
      const savedUpdate = await db.collection('sliderUpdates').insertOne({
        ...req.body,
        createdAt: new Date(),
        isActive: req.body.isActive !== undefined ? req.body.isActive : true
      });
      res.status(201).json({ _id: savedUpdate.insertedId, ...req.body });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Slider updates error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    await client.close();
  }
}
