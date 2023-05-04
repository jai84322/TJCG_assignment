const mongoose = require("mongoose");


const isValidRequest = function (value) {
    if (Object.keys(value).length == 0 ) return false
    return true
}

const isValidObjectId = function (value) {
    let ObjectId = mongoose.Types.ObjectId
    return ObjectId.isValid(value)
}

const isValid = function (value) {
    if (typeof value == "number" || typeof value == "boolean" || value == null ) return false
    if (typeof value === "string" && value.trim().length == 0) return false
    return true 
};

function isValidString(x){
    if(typeof x != "string") return false;
    const regEx = /^\s*[a-zA-Z]+(\.[a-zA-Z\s]+)*[a-zA-Z\s]\s*$/;
    return regEx.test(x)
}

function removeSpaces(x){
    return x.split(" ").filter((y)=> y ).join(" ")
}

function isValidEmail(x){
    const regEx = /^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zA-Z]{2,5})+\s*$/;
    return regEx.test(x)
}

function isValidPassword(x){
    const regEx = /^\s*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}\s*$/    ;
    return regEx.test(x);
}


module.exports = {isValidRequest, isValidObjectId, isValid, isValidPassword, isValidString, isValidEmail, removeSpaces}