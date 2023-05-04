const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({

    title : {
        type : String,
        unique : true,
        required: true
    },

    description : {
        type : String,
        required: true
    },

    isDeleted : {
        type : Boolean,
        default : false
    }


}, {timestamps:true});


module.exports = mongoose.model("Blog", blogSchema);