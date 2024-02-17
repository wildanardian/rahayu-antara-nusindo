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
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Database terhubung');
}
).catch((err) => {
    console.log(err);
}
);
// database connection

// routes
const userRouter = require('./routers/user');
const eventRouter = require('./routers/mediaRelease');
const contactRouter = require('./routers/contact');
const achivmentRouter = require('./routers/achivment');
const aboutRouter = require('./routers/about');
const ofpRouter = require('./routers/ofp');
const visiMisiRouter = require('./routers/visiMisi');
const messageRouter = require('./routers/message');
const mitraRouter = require('./routers/mitra');
const bannerRouter = require('./routers/banner');
const kategoriRouter = require('./routers/kategori');
const visitorRouter = require('./routers/visitor');
// routes

// use routes
app.use('/user', userRouter);
app.use('/media', eventRouter);
app.use('/contact', contactRouter);
app.use('/achievement', achivmentRouter);
app.use('/about', aboutRouter);
app.use('/ofp', ofpRouter);
app.use('/visimisi', visiMisiRouter);
app.use('/message', messageRouter);
app.use('/mitra',mitraRouter);
app.use('/banner',bannerRouter);
app.use('/kategori', kategoriRouter);
app.use('/visit',visitorRouter);
// use routes

app.listen(process.env.local_port,  () => {
    console.log(`Server running on port http://localhost:${process.env.local_port}`);
});
