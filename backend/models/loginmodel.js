const mongoose=require('mongoose');
const loginmodel=mongoose.model("adminlogin",new mongoose.Schema({
   "username":{type:String,required:true},
   "password":{type:String,required:true} 
}));
module.exports=loginmodel