const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");
const { createCustomerService, createArrayCustomerService, getAllCustomerService, updateCustomerService, deleteCustomerService, deleteArrayCustomerService } = require("../services/customerService");
const Joi = require('joi');

module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;

        const schema = Joi.object({
            name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string(),
            phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),
            email: Joi.string().email(),
            description: Joi.string()
        })

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(200).json(
                {
                    msg: error
                }
            );
        } else {
            let imageUrl = "";
            if (!req.files || Object.keys(req.files).length === 0) {
                //do nothing
            } else {
                let results = await uploadSingleFile(req.files.image);
                imageUrl = results.path;
            }

            let customerData = {
                name,
                address,
                phone,
                email,
                description,
                image: imageUrl
            }
            let customer = await createCustomerService(customerData);

            return res.status(200).json(
                {
                    errorCode: 0,
                    data: customer
                }
            );
        }
    },

    postCreateArrayCustomer: async (req, res) => {
        let customer = await createArrayCustomerService(req.body.customers);
        if (customer) {
            return res.status(200).json(
                {
                    errorCode: 0,
                    data: customer
                }
            );
        } else {
            return res.status(200).json(
                {
                    errorCode: -1,
                    data: customer
                }
            );
        }
    },

    getAllCustomer: async (req, res) => {
        let limit = req.query.limit;
        let page = req.query.page;
        let results = "";
        if (limit && page) {
            results = await getAllCustomerService(limit, page, req.query);
        } else {
            results = await getAllCustomerService();
        }
        return res.status(200).json(
            {
                errorCode: 0,
                data: results
            }
        );
    },

    putUpdateCustomer: async (req, res) => {
        let { id, name, email, address } = req.body;
        let results = await updateCustomerService(id, name, email, address);
        console.log(">>>Check: ", results);
        return res.status(200).json(
            {
                errorCode: 0,
                data: results
            }
        )
    },

    deleteACustomer: async (req, res) => {
        let { id } = req.body;
        let results = await deleteCustomerService(id);

        return res.status(200).json(
            {
                errorCode: 0,
                data: results
            }
        )
    },

    deleteArrayCustomer: async (req, res) => {
        let customer = await deleteArrayCustomerService(req.body.customersId);
        return res.status(200).json(
            {
                errorCode: 0,
                data: customer
            }
        );
    },

}