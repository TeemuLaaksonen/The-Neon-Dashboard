// EXPRESS

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

    // Cors is used to allow connections from different domains and ports
    app.use(cors());

    // Convert JSON string to JSON object
    app.use(express.json());

// Add access control headers

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MONGO

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin:QKZb2IZogYcwqoR3@neon.qfhb5vi.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to database");
}
);

// MongoDB Schema

const dataSchema = new mongoose.Schema({
    link: { type: String },
    content: { type: String },
    user: { type: String }
});

// MONGOOSE MODEL

const Data = mongoose.model('Data', dataSchema, 'test');

// Routes

    // GETS all data
    app.get('/test', async (req, res) => {
        const data = await Data.find({});
        res.json(data)
    });
    
    // GETS data by parameter (NOT PERMANENT - FOR EXAMPLE PURPOSES ONLY)
    // Bad practice to use link or id as parameter as they currently are, but maybe user in the future?
    
    app.get('/test/:link', async (req, res) => {
        const data = await Data.findById(req.params.link);
        if (data) res.json(data);
        else res.status(404).json({ message: 'Data not found' });
    });
    
    
    
    // POSTS data
    app.post('/test', async (req, res) => {
        const { link } = req.body;
        const { content } = req.body;
        const { user } = req.body;
        const data = new Data({
            link: link,
            content: content,
            user: user
        });
        const savedData = await data.save();
        res.json(savedData);
    });
    
    //app listening
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });