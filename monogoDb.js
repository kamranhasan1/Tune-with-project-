const mongoose=require("mongoose")

mongoose.connect('mongodb://localhost:27017/ContactDetails')
.then(()=>{
    console.log("MongoDb Connected")
})
.catch(()=>{
    console.log("Failed to Connect")
})


const LoginSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})




const collection=new mongoose.model("Collection1",LoginSchema)

module.exports=collection