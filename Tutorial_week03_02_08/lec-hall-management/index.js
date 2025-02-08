const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userService = require('./userService');

const PORT = 5002;
const MONGO_URI = 'mongodb+srv://chathumicf27:GoZ1AGDUDhcrqBBZ@cluster0.k6gk9.mongodb.net/studentMarks';

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Dummy routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.json(user);
});

app.post('/user', async (req, res) => {
    console.log('Received data:', req.body);
    const newUser = req.body;
    const user = await userService.createUser(newUser);
    res.json(user);
});


app.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(userId, updateData);
    res.json(updatedUser);
});

app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    res.json(result);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
