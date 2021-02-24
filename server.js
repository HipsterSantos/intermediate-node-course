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
    ...req.body
  },
  (err,data)=>{sendResponse(res,err,data)}
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
 User.findById(req.params.id,(err,data)=>{sendResponse(res,err,data)})
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(req.params.id,{
    ...req.body
  },
  {new:true},
  (err,data)=>{sendResponse(res,err,data)})
})
// DELETE
.delete((req,res)=>{
  User.findOneAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)}
  )
})


function sendResponse(res,err,data){
  if(err){
    res.json({success:false,message:err})
  }
  else if (!data){
    res.json({success:false,message: 'Not found'})
  }
  else{
    res.json({success:true,message:data})
  }
}