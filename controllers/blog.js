const blog=require('../models/blog')


const create=(body)=>blog.create(body);



const getAll=(query)=>blog.find(query).exec();

const Getall=()=>blog.find({}).exec();

const getTitle=(title)=>blog.find(title).exec();

const getByTag=(tag)=>blog.find(tag).exec();

const getbyId=(id)=>blog.findById(id).exec();
const editeblog=(id,body)=>blog.findByIdAndUpdate(id,body).exec();
const deleteByid=(id)=>blog.findByIdAndDelete(id).exec();







module.exports={
    create,getAll,getbyId,editeblog,deleteByid,getTitle,getByTag,Getall
}
