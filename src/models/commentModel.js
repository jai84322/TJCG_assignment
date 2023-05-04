const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({

    blogId : {
        type : ObjectId,
        ref : 'Blog',
        required: true
    },

    comment: {
        type : String,
        required: true
    },

    commentBy : {
        type : String,
        required: true
    },

    isDeleted : {
        type : Boolean,
        default : false
    }


}, {timestamps:true});


module.exports = mongoose.model("Comment", commentSchema);