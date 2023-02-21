const { createTaskService, getAllTarkService, updateTaskService, deleteTaskService } = require("../services/taskService");


const postCreateTask = async (req, res) => {
    console.log(req.body);
    let result = await createTaskService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    );
}


const getAllTask = async (req, res) => {
    let result = await getAllTarkService(req.query);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    );
}

const putUpdateTask = async (req, res) => {
    let result = await updateTaskService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

const deleteATask = async (req, res) => {
    let result = await deleteTaskService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

module.exports = { postCreateTask, getAllTask, putUpdateTask, deleteATask }