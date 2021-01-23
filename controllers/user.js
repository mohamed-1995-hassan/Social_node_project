const user=require('../models/user');
const jwt=require('jsonwebtoken');
const { promisify }=require('util');
const asyncsign=promisify(jwt.sign);


const creat=(body)=>user.create(body);
const getAll=()=>user.find({});

const deletbyId=(id) =>user.deleteOne(id).exec();

const editeone=(id,body)=>user.findByIdAndUpdate(id,body,{new:true}).exec();

const getbyId=(id)=>user.findById(id).exec();



const login=async(username,password)=>{
    const use= await user.findOne({username}).exec();
     if(!use)
     {
        
         throw Error('Wrong password and user name');
     }

      const check=use.validatePassword(password);
     if(!check)
     {
         throw Error('UN_AUTHENTICATED');
         
     }

     const token =jwt.sign({

     username : use.username,
     password : use.password,

     },'SECRET_MUST_BE_COMPLEX',{ expiresIn: '1d' });

     

    return  {...use.toJSON(),token} ; 

}


module.exports={

    creat,getAll,deletbyId,editeone,login,getbyId
}