const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User = require('./models/User');
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/data',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected")})
.catch((err)=>{console.log(err)})

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  },
  (err,data)=>{
    if(err){
      res.json({success:false,message:err})
    }else if(!data){
      res.json({success:false,message: "Not found"})
    }else{
      res.json({success:true,data:data})
    }
  }
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
 User.findById(req.params.id,(err,data)=>{
   if(err){
     res.json({
       success:false,
       message:err
     })
   }
   else if(!data){
     res.json({
       success: false,
       message: "Not found"
     })
   }
   else{
     res.json({
       success:true,
       data: data
     })
   }
 })
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  },
  {
    new:true
  },
  (err,data)=>{
    if(err){
      res.json({success:false,message:err})
    }
    else if (!data){
      res.json({
        success:false,
        message: "Not Found"
      })
    }
    else{
      res.json({
        success: true,
        data: data
      })
    }
  })
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})