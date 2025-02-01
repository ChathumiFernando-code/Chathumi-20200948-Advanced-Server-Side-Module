const express = require('express');
const app = express();
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware example
app.use((req, res, next) => {
    console.log("Req 01 : "+`${req.method} ${req.path} - ${new Date()}`);
    req.s = {name: 'John' , age: 30};
    next();
});

// Basic route
app.get('/', (req, res) => {
    console.log('Hello world');
    console.log(req.s);
    res.send('Hello world');
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    // In a real app, you would save to a database here
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// Get all users
app.get('/users', (req, res) => {
    // In a real app, you would fetch from a database
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    res.json(users);
});

// Get specific user
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    // In a real app, you would fetch from a database
    res.json({ id: userId, name: 'John Doe' });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    // In a real app, you would update in a database
    res.json({
        message: 'User updated successfully',
        id: userId,
        updates: updatedUser
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // In a real app, you would delete from a database
    res.json({
        message: 'User deleted successfully',
        id: userId
    });
});

app.post('/users', (req,res) => {
    const newUser = req.body;
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});

// // Route with parameters
// app.get('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.json({ message: `Fetching user ${userId}` });
// });