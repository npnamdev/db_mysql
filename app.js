require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const configViewEngine = require('./src/config/viewEngine');
const { MongoClient } = require('mongodb');

const router = require('./src/routes/web');
const routerAPI = require('./src/routes/api');

const app = express();
const port = process.env.PORT || 8888;  //port

const connection = require('./src/config/database');
const { find } = require('./src/models/user');

//Config file upload
app.use(fileUpload());

//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config template engine &&  Config static files
configViewEngine(app);

//Khai báo Router
app.use('/', router);
app.use('/v1/api/', routerAPI);

(async () => {
    try {
        //Using mongoose
        await connection();

        //Using mongodb
        // const url = process.env.DB_HOST_WITH_DRIVER; ``
        // const client = new MongoClient(url);
        // const dbName = process.env.DB_NAME;

        // await client.connect();
        // console.log('Connected successfully to server');

        // const db = client.db(dbName);
        // const collection = db.collection('customers');

        // collection.insertOne({ "name": "Hoi dan IT" });

        // let a = await collection.findOne({ address: "Hà nội" })
        // console.log(">>>find : ", a);

        //Lắng nghe cổng chạy server
        app.listen(port, () => {
            console.log(`Server running ${port}/`);
        })
    } catch (error) {
        console.log("Error connect to DB: ", error);
    }
})();
