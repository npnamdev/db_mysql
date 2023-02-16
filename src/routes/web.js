const express = require('express');
const { getHomePage, getAdminPage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, getDeletePage } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomePage)
router.get('/create', getCreatePage)
router.get('/update/:id', getUpdatePage)
router.get('/delete/:id', getDeletePage)


router.post('/create-user', postCreateUser)
router.post('/update-user', postUpdateUser)
router.post('/delete-user', postDeleteUser)

module.exports = router;