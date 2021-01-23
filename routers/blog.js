const express = require('express');
const router = express.Router();
const { create, getAll, getbyId, editeblog, deleteByid, getTitle, getByTag } = require('../controllers/blog')
const { editeone } = require('../controllers/user')
const equal = require('deep-equal');


router.post('/', async (req, res, next) => {
    try {

         const { body, user } = req
         const blog = await create({ ...body, userId: user._id });
         const blg_id = blog._id;
         user.Blogs.push(blg_id);
         res.json(user);
         const edit = await editeone(user._id, { ...user });

    }
    catch (e) {
        next(e);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const { user: { _id } } = req
        const blog = await getAll({ userId: _id });
        res.json(blog)
    } catch (e) {
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const blog = await getbyId(req.params.id);
        res.json(blog)
    } catch (e) {
        next(e);
    }
})


router.get('/title/:name', async (req, res, next) => {

    try {
        const title = req.params.name;
        const blog = await getTitle({ title });
        res.json(blog);

    } catch {

        next(e);
    }

})

router.get('/tag/:name', async (req, res, next) => {

    try {
        const tages = req.params.name;
        const blog = await getByTag({ tages: { "$regex": tages, "$options": "i" } });
        res.json(blog);

    } catch {

        next(e);
    }
})


router.patch('/:id',async (req, res, next) => {
    try {
        const { user } = req
         const blog1=await getbyId(req.params.id)
          if(equal(user._id,blog1.userId))
          {
         const blog = await editeblog(req.params.id, req.body);
         res.json(blog)
          }
          else{
             next((new Error('UN_AUTHENTICATED')));
          }
        
    } catch (e) {
        next(e);
    }
})

router.delete('/:id',async (req, res, next) => {
    try {
        const { user } = req;
        const blog1=await getbyId(req.params.id)
        if(equal(user._id,blog1.userId))
        {
        const blog = await deleteByid(req.params.id);
        for(let i=0;i<user.Blogs.length;i++)
        {
            if(equal(user.Blogs[i],blog._id))
            {
                user.Blogs.splice(i,1);
            }
        }
        const u1= await editeone(user._id, {...user});
        res.json(blog);
        }
        else{
            next((new Error('UN_AUTHENTICATED')));
         }
    } catch (e) {
        next(e);
    }
})




module.exports = router;