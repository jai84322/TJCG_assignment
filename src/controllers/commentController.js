const commentModel = require("../models/commentModel");


const createComment = async function (req,res) {

    try {
    let { blogId, comment, commentBy } = req.body;
    let obj = {};

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }   
    
    if (!comment) {
        return res.status(400).send({status: false, msg : "please enter comment"})
    }

    if (!commentBy) {
        return res.status(400).send({status: false, msg : "please enter the name of commenter"})
    }

    obj.blogId = blogId;
    obj.comment = comment;
    obj.commentBy = commentBy;

    let savedData = await commentModel.create(obj);
    return res.status(201).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};



const getComments = async function (req,res) {

    try {
    let ed = req.params.blogId;
    let savedData = await commentModel.find({blogId : ed, isDeleted : false});
    return res.status(200).send({status: true, data : savedData});
    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const getSpecificComment = async function (req,res) {

    try {
    let cid = req.params.commentId;
    console.log(cid)
    let savedData = await commentModel.findById(cid);
    return res.status(200).send({status: true, data : savedData});
    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const updateComment = async function (req,res) {

    try {
    let {comment, commentBy} = req.body;
    let commentId = req.params.commentId;
        let obj = {};
    if (comment) {
        obj.comment = comment;
    }

    if (commentBy) {
        obj.commentBy = commentBy;
    }


    let savedData = await commentModel.findOneAndUpdate({_id : commentId}, obj, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const deleteComment = async function (req,res) {

    try {

    let commentId = req.params.commentId;

    let savedData = await commentModel.findOneAndUpdate({_id : commentId}, {isDeleted: true}, {new : true});
    return res.status(200).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};



module.exports =  { createComment, getComments, getSpecificComment, updateComment, deleteComment }