const mongoose=require('mongoose');

const TASK=mongoose.Schema({
    task:String,
    ref:String
});

module.exports=mongoose.model('Task',TASK);