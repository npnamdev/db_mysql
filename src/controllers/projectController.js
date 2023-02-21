const { createProjectService, getProject, updateProjectService, deleteProjectService } = require("../services/projectService");


const postCreateProject = async (req, res) => {
    let project = await createProjectService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: project
        }
    );
}



const getAllProject = async (req, res) => {
    let project = await getProject(req.query);
    return res.status(200).json(
        {
            errorCode: 0,
            data: project
        }
    );
}



const putUpdateProject = async (req, res) => {
    let results = await updateProjectService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}



const deleteAProject = async (req, res) => {
    let results = await deleteProjectService(req.body);
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

module.exports = { postCreateProject, getAllProject, putUpdateProject, deleteAProject }