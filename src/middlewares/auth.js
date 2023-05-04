const jwt = require("jsonwebtoken");


const authentication = async function (req,res, next) {

    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({status: false, msg : "please send the token"})
        }
    
        let decodedToken = jwt.verify(token, "TJCG_assignment")
    
        if (decodedToken == undefined) {
            return res.status(400).send({status: false, msg : "invalid token"})
        }
    
            next()    
            
    } catch (err) {
        return res.status(500).send({status: false, msg : err.message})
    }

   
};


module.exports = { authentication };