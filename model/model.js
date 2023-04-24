const mongoose=require('mongoose');

const TASK=mongoose.Schema({
    title:String,
    is_completed:Boolean
});

module.exports=mongoose.model('Task',TASK);