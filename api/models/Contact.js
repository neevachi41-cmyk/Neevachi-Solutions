import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'contacts';

// Create a new contact
const createContact = async (contactData) => {
  const db = getDB();
  const { name, email, message } = contactData;
  
  const contact = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    message,
    createdAt: new Date()
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(contact);
  
  return {
    _id: result.insertedId,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    createdAt: contact.createdAt
  };
};

// Get all contacts
const getAllContacts = async () => {
  const db = getDB();
  const contacts = await db.collection(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return contacts;
};

// Get contact by ID
const getContactById = async (contactId) => {
  const db = getDB();
  const contact = await db.collection(COLLECTION_NAME).findOne({ _id: contactId });
  return contact;
};

export default {
  createContact,
  getAllContacts,
  getContactById
};
