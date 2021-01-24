
const express = require('express');
const router = express.Router();
const { creat, getAll, deletbyId, editeone, login, getbyId } = require('../controllers/user');
const auth = require('../Middleware/auth')
const equal = require('deep-equal');

router.post('/', async (req, res, next) => {

    try {
        const user = await creat(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.get('/',auth,async (req, res, next) => {

    try {
        const user = await getAll();
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id',auth, async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const user = await deletbyId({ _id: id });
        res.json(user)

    } catch (e) {
        next(e);
    }

})


router.patch('/:id',auth,async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const user = await editeone(id, body);
        res.json(user)

    } catch (e) {
        next(e);
    }

})

router.post('/login', async (req, res, next) => {

    try {
        const user = await login(req.body.username, req.body.password);
        res.json(user);
    } catch (e) {
        next(e);
    }

})


router.post('/FollowUser/:id', auth, async (req, res, next) => {


    try { 
        const user1 = await getbyId(req.params.id);
        const user2 = req.user;

        for(let i=0;i<user2.Following.length;i++)
        {
            if(equal(user2.Following[i],user1._id))
            {
                res.send("alredy exists");
            }
        }
        user2.Following.push(user1._id);
        user1.Followers.push(user2._id);
        await editeone(user2._id, { ...user2 });
        await editeone(user1._id,{ ...user1 });
        res.json(user2);
    } catch (e) {
        next(e)
    }
})

router.post('/UN_FollowUser/:id', auth, async (req, res, next) => {

    // try {
    //     const user2 = req.user;
    //     const user1 = await getbyId(req.params.id);
    //     const { body }=req
    //     const u= await editeone(user2._id, { ...body ,$pull:{ Following: req.params.id }});

    //     for(let i=0;i<user2.Followers.length;i++)
    //     {
    //         if(equal(user1.Followers[i],user2._id))
    //         {
    //           //  user1.Followers.splice(i,1);
    //           res.send("hello");
    //         }
    //     }
    //     const u1= await editeone(user1._id, {...user1});
    //     res.json(u1);
    // } catch (e) {
    //     next(e)
    // }
    res.send("hello");
})


module.exports = router;