const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config();

app.use(cors())
app.use('/assets',express.static('assets'));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// database connection
mongoose.connect('mongodb://ahlilfikri94:futari123@ac-tcscyzb-shard-00-00.dxk3ml1.mongodb.net:27017,ac-tcscyzb-shard-00-01.dxk3ml1.mongodb.net:27017,ac-tcscyzb-shard-00-02.dxk3ml1.mongodb.net:27017/?ssl=true&replicaSet=atlas-dz4s73-shard-0&authSource=admin&retryWrites=true&w=majority')
// database connection

// routes
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const contactRouter = require('./routers/contact');
const achivmentRouter = require('./routers/achivment');
const aboutRouter = require('./routers/about');
const ofpRouter = require('./routers/ofp');
const visiMisiRouter = require('./routers/visiMisi');
// routes

// use routes

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/contact', contactRouter);
app.use('/achievement', achivmentRouter);
app.use('/about', aboutRouter);
app.use('/ofp', ofpRouter);
app.use('/visimisi', visiMisiRouter);
// use routes

app.listen(process.env.local_port, () => {
    console.log(`Server dimulai pada server ${process.env.local_port}`);
});
