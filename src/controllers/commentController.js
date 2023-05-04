const commentModel = require("../models/commentModel");
const {isValidRequest, isValid, isValidObjectId, isValidPassword, isValidString, isValidEmail, removeSpaces} = require("../validations/validator");

const createComment = async function (req,res) {

    try {
    let { blogId, comment, commentBy } = req.body;
    let obj = {};

    if (!isValidRequest(req.body)) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }  

    if (!blogId) {
        return res.status(400).send({ status: false, msg: "blogId is missing" })
    } else if (!isValidObjectId(blogId)) {
        return res.status(400).send({ status: false, message: "please enter valid blog Id" });
    } else {
        obj.blogId = removeSpaces(blogId)
    }
    
    if (!comment) {
        return res.status(400).send({ status: false, msg: "comment is missing" })
    } else {
        obj.comment = removeSpaces(comment)
    }

    if (!commentBy) {
        return res.status(400).send({status: false, msg : "please enter the name of commenter"})
    } else {
        obj.commentBy = removeSpaces(commentBy)
    }

    let savedData = await commentModel.create(obj);
    return res.status(201).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};



const getComments = async function (req,res) {

    try {
    let ed = req.params.blogId;

    if (!isValidObjectId(ed)) {
        return res.status(400).send({ status: false, message: "please enter valid blog Id" });
    }
    
    let savedData = await commentModel.find({blogId : ed, isDeleted : false});
    return res.status(200).send({status: true, data : savedData});
    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const getSpecificComment = async function (req,res) {

    try {
    let cid = req.params.id;

    if (!isValidObjectId(cid)) {
        return res.status(400).send({ status: false, message: "please enter valid comment Id" });
    }

    let savedData = await commentModel.findById(cid);
    return res.status(200).send({status: true, data : savedData});
    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const updateComment = async function (req,res) {

    try {
    let {comment, commentBy} = req.body;
    let commentId = req.params.id;
    
    if (!isValidObjectId(commentId)) {
        return res.status(400).send({ status: false, message: "please enter valid commentId Id" })
    }

    let obj = {};

    if (comment) {
        if (!isValid(comment)) {
            return res.status(400).send({ status: false, message: "please enter valid comment input" })
        } else {
            obj.comment = removeSpaces(comment)
        }
    }

    if (commentBy) {
        if (!isValid(commentBy)) {
            return res.status(400).send({ status: false, message: "please enter valid commenter name input" })
        } else {
            obj.commentBy = removeSpaces(commentBy)
        }
    }


    let savedData = await commentModel.findOneAndUpdate({_id : commentId}, obj, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const deleteComment = async function (req,res) {

    try {

    let commentId = req.params.id;

    if (!isValidObjectId(commentId)) {
        return res.status(400).send({ status: false, message: "please enter valid commentId Id" })
    }

    let savedData = await commentModel.findOneAndUpdate({_id : commentId}, {isDeleted: true}, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};



module.exports =  { createComment, getComments, getSpecificComment, updateComment, deleteComment }