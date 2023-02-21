const Task = require('../models/task');
const aqp = require('api-query-params');

const createTaskService = async (data) => {
    try {
        if (data.type === "EMPTY-TASK") {
            let result = await Task.create(data);
            return result;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getAllTarkService = async (queryString) => {
    try {
        const page = queryString.page;

        const { filter, limit } = aqp(queryString);
        delete filter.page;

        let skip = (page - 1) * limit;
        let results = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .exec();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}




const updateTaskService = async (data) => {
    console.log(data);
    try {
        let result = await Task.updateOne({ _id: data.id }, { ...data });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteTaskService = async (data) => {
    try {
        let result = await Task.deleteById({ _id: data.id });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}




module.exports = { createTaskService, getAllTarkService, updateTaskService, deleteTaskService };