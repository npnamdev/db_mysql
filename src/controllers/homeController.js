const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');

//==================GET===============

const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    res.render('home.ejs', { listUsers: results });
}

const getAdminPage = (req, res) => {
    res.render('admin.ejs');
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userID = req.params.id;
    let user = await getUserById(userID);
    res.render('edit.ejs', { user: user });
}

const getDeletePage = async (req, res) => {
    const userID = req.params.id;
    let user = await getUserById(userID);
    res.render('delete.ejs', { user: user });
}

//==================post===============

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;
    let [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city]
    );
    res.redirect('/');
}

const postUpdateUser = async (req, res) => {
    let { userId, email, name, city } = req.body;
    await updateUserById(email, name, city, userId);
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    let { userId } = req.body;
    await deleteUserById(userId);
    res.redirect('/');
}

module.exports = {
    getHomePage, getAdminPage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, getDeletePage
}