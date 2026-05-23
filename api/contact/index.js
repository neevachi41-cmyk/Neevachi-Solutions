// In-memory storage for contacts (in production, use a database)
let contacts = [];

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create new contact
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: newContact
    });
  } else if (method === 'GET') {
    res.json(contacts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
