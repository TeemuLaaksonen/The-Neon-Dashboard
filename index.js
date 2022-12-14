// EXPRESS

const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const app = express();
const port = 3000;

    // Cors is used to allow connections from different domains and ports
    app.use(cors());

    // Convert JSON string to JSON object
    app.use(express.json());

// MONGO

const mongoose = require("mongoose");
const mongoDB = 'mongodb+srv://admin:QKZb2IZogYcwqoR3@neon.qfhb5vi.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to database");
}
);

// MONGOOSE SCHEMA

const dataSchema = new mongoose.Schema({
    text: { type: String, required: false }
});

// MONGOOSE MODEL

const Data = mongoose.model('Data', dataSchema, "data");

// DATA ROUTES - API

app.get('/data', async (request, response) => {
    const data = await Data.find({});
    response.json(data);
});

app.get('/data/:id', async (request, response) => {
    const data = await Data.findById(request.params.id);
    if (data) response.json(data);
    else response.status(404).end();
});

app.post('/data', async (request, response) => {
    const { text } = request.body;
    const data = new Data({ text : text });
    const savedData = await data.save();
    response.json(savedData);
});

app.delete('/data/:id', async (request, response) => {
    const deletedData = await Data.findByIdAndDelete(request.params.id);
    if (deletedData) response.json(deletedData);
    else response.status(404).end();
});

// APP LISTENING TO PORT 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});