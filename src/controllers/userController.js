const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


const createUser = async function (req,res) {

    try {
    let { fname, lname, email, password } = req.body;
    let obj = {};

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }   
    
    if (!fname) {
        return res.status(400).send({status: false, msg : "please enter fname"})
    }

    if (!lname) {
        return res.status(400).send({status: false, msg : "please enter lname"})
    }

    if (!email) {
        return res.status(400).send({status: false, msg : "please enter email"})
    }

    if (!password) {
        return res.status(400).send({status: false, msg : "please enter password"})
    }

    obj.fname = fname;
    obj.lname = lname;
    obj.email = email;
    obj.password = password;

    let savedData = await userModel.create(obj);
    return res.status(201).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const loginUser = async function (req,res) {

    try {
        
    let { email, password } = req.body;

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }   
    
    if (!email) {
        return res.status(400).send({status: false, msg : "please enter email"})
    }

    if (!password) {
        return res.status(400).send({status: false, msg : "please enter password"})
    }

    let user = await userModel.findOne({email: email, password : password});
    if (!user) {
        return res.status(400).send({status: false, msg : "user not found"})
    }
    
    let token = jwt.sign({
        userId : user._id,
    }, "itissecreatkey");


    return res.status(200).send({status: true, data : token});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }

};


module.exports = { createUser, loginUser }