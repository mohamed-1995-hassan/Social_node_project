const express=require('express');
const router=express.Router();
const blog=require('./blog');
const user=require('./user');
const last=require('./Home')

const auth=require('../Middleware/auth')


router.use('/user',user);
router.use('/blog',auth,blog);
router.use('/home',last)





module.exports=router;
