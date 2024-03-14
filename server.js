const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const cosmosConnectionString = "your_cosmos_db_connection_string"; // Update this
const dbName = "HamedMongoDB";
const collectionName = "Hamed Collection1";

// Connect to MongoDB
const client = new MongoClient(cosmosConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/create-document', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(req.body);
        res.json({
            id: result.insertedId,
            status: "success",
            message: "Document created successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `Error: ${error.message}`
        });
    }
});

app.get('/read-document', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.json(documents);
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `Error: ${error.message}`
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
