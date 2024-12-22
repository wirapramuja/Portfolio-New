const { MongoClient } = require('mongodb');

export default async function connectToDatabse() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Error connection to MongoDB:', error);
    throw error;
  }
}
