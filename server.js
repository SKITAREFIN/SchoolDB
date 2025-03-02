const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI; // Use environment variable for MongoDB connection string
const client = new MongoClient(uri);

app.get('/student/:name', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('SchoolDB');
    const collection = database.collection('students');

    const student = await collection.findOne({ name: req.params.name });
    if (student) {
      res.json(student); // Send student data (including photo path)
    } else {
      res.status(404).send('Student not found');
    }
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});