const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./Routes/todo');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use('/api', todoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected!!'))
.catch((err) => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});