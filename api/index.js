const express = require('express');
const path = require('path');
const app = require('./app');

const db = require('./config/db');

const port = process.env.PORT || 3000;

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Server listening on port http://localhost:${port}`);
});


//* This is the entry point of your server
