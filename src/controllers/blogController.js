const blogModel = require("../models/blogModel");
const {isValidRequest, isValid, isValidObjectId, isValidPassword, isValidString, isValidEmail, removeSpaces} = require("../validations/validator")


const createBlog = async function (req,res) {

    try {
    let { title, description } = req.body;
    let obj = {};

    if (!isValidRequest(req.body)) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }  
    
    if (!title) {
        return res.status(400).send({ status: false, msg: "title is missing" })
    } else {
        obj.title = removeSpaces(title)
    }

    if (!description) {
        return res.status(400).send({ status: false, msg: "description is missing" })
    } else {
        obj.description = removeSpaces(description)
    }


    let savedData = await blogModel.create(obj);
    return res.status(201).send({status: true, msg : "blog created successfully", data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const getBlogs = async function (req,res) {

    try {
    
    let savedData = await blogModel.find({isDeleted:false});
    return res.status(200).send({status: true, count : savedData.length, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false,  msg : err.message})
    }
    
};

const getBlog = async function (req,res) {

    try {

    let blogId = req.params.id;
    
    if (!isValidObjectId(blogId)) {
        return res.status(400).send({ status: false, message: "please enter valid blog Id" });
    }

    let savedData = await blogModel.findById(blogId);

    if (!savedData) {
        return res.status(404).send({ status: false, msg: "No blog found with this id" })
    }

    if (savedData.isDeleted == true) {
        return res.status(400).send({ status: false, msg: "This blog has been deleted" })
    }

    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};

const updateBlog = async function (req,res) {

    try {
    let {title, description} = req.body;
    let blogId = req.params.id;

    if (!isValidObjectId(blogId)) {
        return res.status(400).send({ status: false, message: "please enter valid blog Id" })
    }

    let obj = {};

    if (title) {
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "please enter valid title input" })
        } else {
            obj.title = removeSpaces(title)
        }
    }

    if (description) {
        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "please enter valid description input" })
        } else {
            description = removeSpaces(description)
        }
    }


    let savedData = await blogModel.findOneAndUpdate({_id : blogId, isDeleted : false}, obj, {new : true});
    if (!savedData) {
        return res.status(400).send({ status: false, msg: "blog is either deleted or not found" })
    }

    return res.status(200).send({status: true, msg: "blog updated successfully", data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const deleteBlog = async function (req,res) {

    try {

    let blogId = req.params.id;

    if (!isValidObjectId(blogId)) {
        return res.status(400).send({ status: false, message: "please enter valid blog Id" })
    }

    let savedData = await blogModel.findOneAndUpdate({_id : blogId}, {isDeleted: true}, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};

module.exports = {createBlog, getBlogs, getBlog, updateBlog, deleteBlog };