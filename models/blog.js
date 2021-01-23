const mongoose=require('mongoose');
const { Schema } = mongoose;

const blogSchema=new Schema({
title:{
 type : String,
 minlength : 5,
 maxlength : 20,
 required : true,
},

body:{
type:String,    
minlength:15,
maxlength:150,
},
tages : [String],
auther:String
,
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
}

});
const blogModel=mongoose.model('blog',blogSchema);
module.exports=blogModel;

