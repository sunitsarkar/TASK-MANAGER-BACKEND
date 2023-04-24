
const {Router}= require('express');
const Task=require('../model/model');

const router=Router();

router.post('/POST/v1/tasks',(req,res)=>{
    const task=new Task(req.body);
    task.save();
    res.status(201).send(task)
});

router.get("/GET/v1/tasks",(req,res)=>{
    Task.find().then((result)=>{
        res.json(result)
    })
});

router.param("id",(req,res,next,id)=>{
    Task.findById(id).exec().then((t)=>{
        req.task=t;
        next();
    });

});

router.get("/GET/v1/tasks/:id",(req,res)=>{
    const task=req.task;
    res.send(task)
});

router.delete("/DELETE/v1/tasks/:id",(req,res)=>{
    const task=req.task;
    Task.deleteOne(task);
    res.status(204).send(task)
});

router.put("/PUT/v1/tasks/:id",(req,res)=>{
    const task=req.task;
    const {title,is_completed}=req.body;

    task.title=title;
    task.is_completed=is_completed;

    task.save().then((data,err)=>{
        if(err){
            res.status(404).send({ 
                error: "There is no task at that id"
            }
            )
        }
    });
    res.send(task)
});

router.delete("/DELETE/v1/tasks",(req,res)=>{
    const arr=req.body;
    Task.deleteMany(arr);
    res.status(204).send()
})






module.exports=router;