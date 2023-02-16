const express = require('express');

//  Dường dẫn hiện tại của file đang đứng
// const path = require('path');
// console.log(path.join(__dirname))

const configViewEngine = (app) => {
    app.set('views', 'src/views');
    app.set('view engine', 'ejs');

    //Config static files
    app.use(express.static('src/public'));
}

module.exports = configViewEngine;