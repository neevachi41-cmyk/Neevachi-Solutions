import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'sliderUpdates';

const VALID_ICONS = ['Trophy', 'Users', 'Building', 'Settings', 'Award'];

// Create a new slider update
const createSliderUpdate = async (sliderData) => {
  const db = getDB();
  const { title, teamName, position, schoolName, category, image, icon, isActive = true, order = 0 } = sliderData;
  
  // Validate icon
  if (!VALID_ICONS.includes(icon)) {
    throw new Error(`Invalid icon. Must be one of: ${VALID_ICONS.join(', ')}`);
  }
  
  const sliderUpdate = {
    title: title.trim(),
    teamName: teamName.trim(),
    position: position.trim(),
    schoolName: schoolName.trim(),
    category: category.trim(),
    image,
    icon,
    isActive,
    order,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(sliderUpdate);
  
  return {
    _id: result.insertedId,
    ...sliderUpdate
  };
};

// Get all slider updates
const getAllSliderUpdates = async () => {
  const db = getDB();
  const sliderUpdates = await db.collection(COLLECTION_NAME)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return sliderUpdates;
};

// Get active slider updates
const getActiveSliderUpdates = async () => {
  const db = getDB();
  const sliderUpdates = await db.collection(COLLECTION_NAME)
    .find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return sliderUpdates;
};

// Get slider update by ID
const getSliderUpdateById = async (sliderId) => {
  const db = getDB();
  const sliderUpdate = await db.collection(COLLECTION_NAME).findOne({ _id: sliderId });
  return sliderUpdate;
};

// Update slider update
const updateSliderUpdate = async (sliderId, updateData) => {
  const db = getDB();
  
  // Validate icon if provided
  if (updateData.icon && !VALID_ICONS.includes(updateData.icon)) {
    throw new Error(`Invalid icon. Must be one of: ${VALID_ICONS.join(', ')}`);
  }
  
  const updateDoc = {
    ...updateData,
    updatedAt: new Date()
  };
  
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: sliderId },
    { $set: updateDoc }
  );
  
  if (result.matchedCount === 0) {
    return null;
  }
  
  return await getSliderUpdateById(sliderId);
};

// Delete slider update
const deleteSliderUpdate = async (sliderId) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: sliderId });
  return result.deletedCount > 0;
};

export default {
  createSliderUpdate,
  getAllSliderUpdates,
  getActiveSliderUpdates,
  getSliderUpdateById,
  updateSliderUpdate,
  deleteSliderUpdate
};
