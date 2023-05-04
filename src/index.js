const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const URL = 'mongodb+srv://jai84322:Bing%401234%23@demo.3li78.mongodb.net/TJCG_assignment?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useNewUrlParser: true
})
.then(()=> console.log("mongodb is connected"))
.catch(err => console.log(err));

app.use('/', route);

app.listen( process.env.PORT || 3000, function(){
    console.log("server is running on port " + (process.env.PORT || 3000))
});