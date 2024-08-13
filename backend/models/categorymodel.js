const mongoose=require('mongoose');
const catmodel=mongoose.model("category",new mongoose.Schema({
    catname:{type:String,required:true}
}));
module.exports=catmodel;

