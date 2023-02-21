const Customer = require('../models/customer');
const aqp = require('api-query-params');

const createCustomerService = async (customerData) => {
    try {
        let results = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        });
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let results = await Customer.insertMany(arr);
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomerService = async (limit, page, queryString) => {
    try {
        let results = "";
        if (limit && page) {
            let skip = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;

            results = await Customer.find(filter).skip(skip).limit(limit).exec();
            console.log(">>>Check filer: ", filter);
            console.log('>>limit: ', limit, 'skip', skip);
        } else {
            results = await Customer.find({});
        }
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateCustomerService = async (id, name, email, address) => {
    try {
        let results = await Customer.updateOne({ _id: id }, { name: name, email: email, address: address });
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteCustomerService = async (id) => {
    try {
        let results = await Customer.deleteById({ _id: id });
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteArrayCustomerService = async (arr) => {
    try {
        let results = await Customer.delete({ _id: { $in: arr } });
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createCustomerService, createArrayCustomerService, getAllCustomerService, updateCustomerService, deleteCustomerService, deleteArrayCustomerService
}


110