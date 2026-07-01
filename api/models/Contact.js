import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'contacts';

// Create a new contact
const createContact = async (contactData) => {
  const db = getDB();
  const { name, email, message } = contactData;
  
  const contact = {
    name,
    email,
    message,
    createdAt: new Date()
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(contact);
  
  return {
    _id: result.insertedId,
    ...contact
  };
};

// Get all contacts
const getAllContacts = async () => {
  const db = getDB();
  const contacts = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
  return contacts;
};

export default {
  createContact,
  getAllContacts
};
