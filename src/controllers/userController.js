const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {isValidRequest, isValidObjectId, isValidPassword, isValidString, isValidEmail, removeSpaces} = require("../validations/validator")

const createUser = async function (req,res) {

    try {
    let { fname, lname, email, password } = req.body;
    let obj = {};

    if (!isValidRequest(req.body)) {
        return res.status(400).send({status: false, msg : "please enter data in the request body"})
    }   
    
    if (!fname) {
        return res.status(400).send({ status: false, msg: "fname is missing" })
    } else  if (!isValidString(fname)) {
        return res.status(400).send({ status: false, message: "please enter valid fname string input" })
    } else {
        obj.fname = removeSpaces(fname)
    }


    if (!lname) {
        return res.status(400).send({ status: false, msg: "lname is missing" })
    } else  if (!isValidString(lname)) {
        return res.status(400).send({ status: false, message: "please enter valid lname string input" })
    } else {
        obj.lname = removeSpaces(lname)
    }


    if (!email) {
        return res.status(400).send({ status: false, msg: "email is missing" })
    } else if (!isValidEmail(email)) { 
        return res.status(400).send({ status: false, message: "Please provide valid email" })
    }

    let uniqueEmail = await userModel.findOne({ email: email })
    if (uniqueEmail) {
        return res.status(409).send({ status: false, msg: "This email already exists" })
    } else {
        obj.email = email;
    }

    if (!password) {
        return res.status(400).send({ status: false, msg: "password is missing" })
    } else if (!isValidPassword(password)) { 
        return res.status(400).send({status:false, message: "please enter valid password length should be between 8-25, one uppercase, one lowercase, one digit, one special character"})
    } else {
        obj.password = password;
    }

    let savedData = await userModel.create(obj);
    return res.status(201).send({status: true, data : savedData});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }
    
};


const loginUser = async function (req,res) {

    try {
        
        let {email, password} = req.body;

        if (!isValidRequest(req.body)) {
            return res.status(400).send({status: false, msg : "please enter data in the request body"})
        }   

        if (!email) {
            return res.status(400).send({ status: false, msg: "please enter email" })
        }
    
        if (!password) {
            return res.status(400).send({ status: false, msg: "please enter password " })
        }
    

    let user = await userModel.findOne({email: email, password : password});
    if (!user) {
        return res.status(400).send({status: false, msg : "invalid email"})
    }
    
    let token = jwt.sign(
        {
            id: user._id,
        },
        "TJCG_assignment", { expiresIn: "1d" })


    return res.status(200).send({status: true,  msg: "you are successfully loggedin", data : token});

    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }

};


module.exports = { createUser, loginUser }