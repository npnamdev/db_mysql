const express = require('express');
const routerAPI = express.Router();
const { getUsersApi, createUserApi, updateUserApi, deleteUserApi, uploadSingleFileApi, uploadMultipleFileApi } = require('../controllers/apiController');

const { postCreateCustomer, postCreateArrayCustomer, getAllCustomer, putUpdateCustomer, deleteACustomer, deleteArrayCustomer } = require('../controllers/customerController');


const { postCreateProject, getAllProject, putUpdateProject, deleteAProject } = require('../controllers/projectController');



const { postCreateTask, getAllTask, putUpdateTask, deleteATask } = require('../controllers/taskController');





routerAPI.get('/users', getUsersApi);
routerAPI.post('/users', createUserApi);
routerAPI.put('/users', updateUserApi);
routerAPI.delete('/users', deleteUserApi);


routerAPI.post('/file', uploadSingleFileApi);
routerAPI.post('/files', uploadMultipleFileApi);


routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getAllCustomer);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteArrayCustomer);


routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getAllProject);
routerAPI.put('/projects', putUpdateProject);
routerAPI.delete('/projects', deleteAProject);

routerAPI.post('/tasks', postCreateTask);
routerAPI.get('/tasks', getAllTask);
routerAPI.put('/tasks', putUpdateTask);
routerAPI.delete('/tasks', deleteATask);



routerAPI.get('/info', (req, res) => {
    res.status(200).json({
        data: req.query
    })
});

routerAPI.get('/info/:name/:address', (req, res) => {
    res.status(200).json({
        data: req.params
    })
});



module.exports = routerAPI;


