
const {Router}= require('express');
const Task=require('../model/model');
const User=require('../model/user')
const router=Router();
const jwt=require('jsonwebtoken');
require('dotenv').config();
const auth=require('../middleware/authentication')
////////////////authentication and register
router.post('/register',(req,res)=>{
    const user=new User(req.body);

    user.save();
    res.status(201).send(user)
});

const secretKey=process.env.JWT_SECRET;

router.post('/login',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
   const userlogin=await User.findOne({ username: username });

   if (!userlogin) {
      return res.status(409).json({
        status: "Failed",
        message: "There is no acccount with this mail",
      });
    }
   
   if(userlogin){
    if(userlogin.password === password){
        const token= jwt.sign({user_id:userlogin._id},secretKey,{expiresIn:"2h"});
        // console.log(token);

        res.status(200).json({
            status: "success",
            token,
          });
    }
    else{
        return res.status(409).json({
            status: "failed",
            message: "Incorrect password ",
          });
    }
   }
})

////////////////////
router.post('/tasks',auth,(req,res)=>{
    const task=new Task(req.body);
    task.save();
    res.status(201).send(task)
});

router.get("/tasks",auth,(req,res)=>{
    // console.log(req.query.ref);
    const ref=req.query.ref
    Task.find({ref:ref}).then((result)=>{
        res.json(result)
    })
});

//delete
router.delete('/tasks', (req, res) => {
    const id = req.query.id;
    Task.deleteOne({ _id: id })
      .then(() => {
        res.status(204).send('deleted');
      })
      .catch((error) => {
        res.status(404).send({ error: "There is no such product id" });
      });
  });

  /////update
  router.put('/tasks', (req, res) => {
    const id = req.query.id;
    const { task,ref } = req.body;
  
    Task.findByIdAndUpdate(id, { task,ref }, { new: true })
      .then((updatedProduct) => {
        if (updatedProduct) {
          res.send(updatedProduct);
        } else {
          res.status(404).send({ error: "There is no such product id" });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: "Internal Server Error" });
      });
  });


module.exports=router;