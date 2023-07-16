const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// database connection
mongoose.connect('mongodb+srv://catalistranproject:catalistranproject123@ranproject.fdbqigs.mongodb.net/')
// database connection

// routes
const userRouter = require('./routers/user');
const eventRouter = require('./routers/user');
const contactRouter = require('./routers/contact');
const achivmentRouter = require('./routers/achivment');
// routes

// use routes

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/contact', contactRouter);
app.use('/achivment', achivmentRouter);
// use routes


app.get('/', (req, res) => {
    res.send('bismillah hirrohman nirrohim');
});

app.listen(process.env.local_port, () => {
    console.log(`Server dimulai pada server ${process.env.local_port}`);
});
  