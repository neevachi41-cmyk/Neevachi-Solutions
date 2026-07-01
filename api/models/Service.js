import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'services';

// Create a new service
const createService = async (serviceData) => {
  const db = getDB();
  
  const service = {
    ...serviceData,
    createdAt: new Date(),
    isActive: serviceData.isActive !== undefined ? serviceData.isActive : true
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(service);
  
  return {
    _id: result.insertedId,
    ...service
  };
};

// Get all active services
const getActiveServices = async () => {
  const db = getDB();
  const services = await db.collection(COLLECTION_NAME).find({ isActive: true }).sort({ order: 1 }).toArray();
  return services;
};

// Get all services (including inactive)
const getAllServices = async () => {
  const db = getDB();
  const services = await db.collection(COLLECTION_NAME).find({}).sort({ order: 1 }).toArray();
  return services;
};

// Get service by ID
const getServiceById = async (id) => {
  const db = getDB();
  const service = await db.collection(COLLECTION_NAME).findOne({ _id: id });
  return service;
};

// Update service
const updateService = async (id, updateData) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: id },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) {
    return null;
  }
  
  return await getServiceById(id);
};

// Delete service
const deleteService = async (id) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  
  return result.deletedCount > 0;
};

export default {
  createService,
  getActiveServices,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
