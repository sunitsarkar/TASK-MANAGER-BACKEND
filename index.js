const bodyParser = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const router=require('./router/router')

const dburl="mongodb+srv://sunitsarkar:LwP8bgRq3VOKlHWI@cluster0.gxschpx.mongodb.net/?retryWrites=true&w=majority";
//db connection
mongoose.set('strictQuery',false);
mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connedted to databse')
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',router);

app.listen(8000,()=>{
    console.log('app is running on port 8000')
})
