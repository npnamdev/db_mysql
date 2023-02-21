const User = require("../models/user");

//==================GET===============

const getHomePage = async (req, res) => {
    let results = await User.find({});
    res.render('home.ejs', { listUsers: results });
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userID = req.params.id;
    let user = await User.findById(userID);
    res.render('edit.ejs', { user: user });
}

const getDeletePage = async (req, res) => {
    const userID = req.params.id;
    let user = await User.findById(userID);
    res.render('delete.ejs', { user: user });
}

//==================post===============

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;
    await User.create({ email, name, city, });
    res.redirect('/');
}

const postUpdateUser = async (req, res) => {
    let { userId, email, name, city } = req.body;
    await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    let { userId } = req.body;
    await User.deleteOne({ _id: userId })
    res.redirect('/');
}

module.exports = {
    getHomePage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, getDeletePage
}

