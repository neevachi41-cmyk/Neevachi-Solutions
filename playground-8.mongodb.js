// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Step 1: List all databases to find your actual database
db.adminCommand({listDatabases: 1});

// Step 2: Replace "your_database_name" with the actual database name from step 1
use("Test");

// Step 3: List all collections in the database
db.getCollectionNames();

// Step 4: Query the contacts collection
db.getCollection("contacts").find({});

// Step 5: If you want to see the most recent contacts first
db.getCollection("contacts").find({}).sort({createdAt: -1});

// Step 6: Count total contacts
db.getCollection("contacts").countDocuments();

// Step 7: Insert a test contact (if collection is empty)
db.getCollection("contacts").insertOne({
  name: "Test User",
  email: "test@example.com",
  message: "This is a test message",
  createdAt: new Date()
});
