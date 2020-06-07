const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req,res) =>{
    res.send("Bug Tracker Project - Backend under construction");
})

app.listen(9000,()=>{
    console.log("listening to port 9000");
})