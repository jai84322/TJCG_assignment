const blogModel = require("../models/blogModel");



const createBlog = async function (req,res) {

    try {
    let { title, description } = req.body;
    let obj = {};

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }   
    
    if (!title) {
        return res.status(400).send({status: false, msg : "please enter title"})
    }

    if (!description) {
        return res.status(400).send({status: false, msg : "please enter description"})
    }

    obj.title = title;
    obj.description = description;

    let savedData = await blogModel.create(obj);
    return res.status(201).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const getBlogs = async function (req,res) {

    try {
    
    let savedData = await blogModel.find({isDeleted:false});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};

const getBlog = async function (req,res) {

    try {
    let blogId = req.params.id;
    let savedData = await blogModel.findById(blogId);
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};

const updateBlog = async function (req,res) {

    try {
    let {title, description} = req.body;
    let blogId = req.params.id;
        let obj = {};
    if (title) {
        obj.title = title;
    }

    if (description) {
        obj.description = description;
    }


    let savedData = await blogModel.findOneAndUpdate({_id : blogId}, obj, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const deleteBlog = async function (req,res) {

    try {

    let blogId = req.params.id;

    let savedData = await blogModel.findOneAndUpdate({_id : blogId}, {isDeleted: true}, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};

module.exports = {createBlog, getBlogs, getBlog, updateBlog, deleteBlog };