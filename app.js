require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const configViewEngine = require('./src/config/viewEngine');

const router = require('./src/routes/web');
const app = express();
const port = process.env.PORT || 8888;  //port

//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config template engine &&  Config static files
configViewEngine(app);

//Khai báo Router
app.use('/', router);

//Lắng nghe cổng chạy server
app.listen(port, () => {
    console.log(`Server running ${port}/`);
})