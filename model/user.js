const mongoose=require('mongoose');

const taskUser=mongoose.Schema({
    name:String,
    username:String,
    password:String
})


module.exports=mongoose.model('taskUser',taskUser)