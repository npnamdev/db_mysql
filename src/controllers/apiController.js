const User = require("../models/user");
const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");
//==================GET===============

const getUsersApi = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

const createUserApi = async (req, res) => {
    let { email, name, city } = req.body;
    let results = await User.create({ email, name, city, });
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

const updateUserApi = async (req, res) => {
    let { userId, email, name, city } = req.body;
    let results = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

const deleteUserApi = async (req, res) => {
    let { userId } = req.body;
    let results = await User.deleteOne({ _id: userId })
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

const uploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let results = await uploadSingleFile(req.files.image);
    console.log(">>>Check results: ", results);

    return res.send("ok single");
}

const uploadMultipleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    if (Array.isArray(req.files.image)) {
        let results = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } else {
        return await uploadSingleFileApi(req, res);
    }

    return res.send("ok Multiple");
}


module.exports = {
    getUsersApi, createUserApi, updateUserApi, deleteUserApi, uploadSingleFileApi, uploadMultipleFileApi
}