const mongoose= require("mongoose");
const express= require("express");
const app= express();
const dotenv = require('dotenv');
const PORT=3000

dotenv.config(); 
app.listen(PORT, (req, res)=>{
    console.log(`Backend app running on ${PORT}`)
})

mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})
.then((result)=>{
console.log("Server connected succesfully!")
})
.catch((error)=>{
    console.error("Error connecting to database:", error);
});
