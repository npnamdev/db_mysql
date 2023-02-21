const Project = require('../models/project');
const aqp = require('api-query-params');

const createProjectService = async (data) => {
    try {
        if (data.type === "EMPTY-PROJECT") {
            let results = await Project.create(data);
            return results;
        }



        if (data.type === "REMOVE-USERS") {
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.pull(data.usersArr[i]);
            }

            let newResult = await myProject.save();
            return newResult;
        }


        if (data.type === "ADD-USERS") {
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i]);
            }

            let newResult = await myProject.save();
            return newResult
        }


        if (data.type === "ADD-TASKS") {
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.taskArr.length; i++) {
                myProject.tasks.push(data.taskArr[i]);
            }

            let newResult = await myProject.save();
            return newResult
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}




const getProject = async (queryString) => {
    try {
        const page = queryString.page;

        const { filter, limit, population } = aqp(queryString);
        delete filter.page;

        let skip = (page - 1) * limit;
        let results = await Project.find(filter)
            .populate(population)
            .skip(skip)
            .limit(limit)
            .exec();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const updateProjectService = async (data) => {
    try {
        let results = await Project.updateOne({ _id: data.projectId }, { name: data.name, endDate: data.endDate, description: data.description });

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteProjectService = async (data) => {
    try {
        let results = await Project.deleteById({ _id: data.projectId });
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { createProjectService, getProject, updateProjectService, deleteProjectService };