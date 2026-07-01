import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'sliderUpdates';

// Create a new slider update
const createSliderUpdate = async (sliderData) => {
  const db = getDB();
  
  const sliderUpdate = {
    ...sliderData,
    createdAt: new Date(),
    isActive: sliderData.isActive !== undefined ? sliderData.isActive : true
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(sliderUpdate);
  
  return {
    _id: result.insertedId,
    ...sliderUpdate
  };
};

// Get all active slider updates
const getActiveSliderUpdates = async () => {
  const db = getDB();
  const updates = await db.collection(COLLECTION_NAME).find({ isActive: true }).sort({ createdAt: -1 }).toArray();
  return updates;
};

// Get all slider updates (including inactive)
const getAllSliderUpdates = async () => {
  const db = getDB();
  const updates = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
  return updates;
};

// Get slider update by ID
const getSliderUpdateById = async (id) => {
  const db = getDB();
  const update = await db.collection(COLLECTION_NAME).findOne({ _id: id });
  return update;
};

// Update slider update
const updateSliderUpdate = async (id, updateData) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: id },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) {
    return null;
  }
  
  return await getSliderUpdateById(id);
};

// Delete slider update
const deleteSliderUpdate = async (id) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  
  return result.deletedCount > 0;
};

export default {
  createSliderUpdate,
  getActiveSliderUpdates,
  getAllSliderUpdates,
  getSliderUpdateById,
  updateSliderUpdate,
  deleteSliderUpdate
};
