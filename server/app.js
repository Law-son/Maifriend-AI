const express = require('express');
const serverRouter = require('./routes/server.route');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use(cors(corsOptions));
app.use(express.json()); // This line replaces bodyParser.json()

app.use(express.urlencoded({ extended: true }));

app.use('/', serverRouter);

module.exports = app;
