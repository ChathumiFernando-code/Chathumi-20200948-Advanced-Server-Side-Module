const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Default Route (like Welcome Controller in CodeIgniter)
app.get('/', (req, res) => {
    res.render('welcome'); // loads views/welcome.ejs
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// app.get('/student', (req, res) => {
//     res.render('student', { name: "John Doe", course: "Computer Science", picture: "https://example.com/image.jpg" });
// });

app.get('/student', (req, res) => {
    const studentData = {
        name: req.query.name || "John Doe",
        course: req.query.course || "Computer Science",
        picture: req.query.picture || "/image.jpg"
    };
    res.render('student', studentData);
});

app.get('/book-form', (req, res) => {
    res.render('book-form');
});

app.post('/favorite-book', (req, res) => {
    const book = req.body.book;
    res.render('book-result', { book });
});

app.post('/favorite-book', (req, res) => {
    const bookDetails = req.body;
    res.render('book-result', { bookDetails });
});

