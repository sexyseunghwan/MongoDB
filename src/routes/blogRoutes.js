const { Router } = require('express');
const blogRouter = Router();
//const { Blog } = require('../models/Blog');
//const { User } = require('../models/User');
//위의 두개를 하나의 인덱스로 엮음
const {Blog,User} = require('../models')

const {isValidObjectId} = require('mongoose');

blogRouter.post('/',async(req,res)=>{
    try {

        const { title, content, islive, userId} = req.body

        if (typeof title !== 'string') return res.status(400).send({err: "title is required"});
        if (typeof content !== 'string') return res.status(400).send({err: "content is required"});
        if (islive && islive !== 'boolean') return res.status(400).send({err: "islive is required"});
        if (!isValidObjectId(userId)) return res.status(400).send({err: "userId is invalid"});

        //유저가 존재하는지 검증
        let user = await User.findById(userId);
        if (!user) return res.status(400).send({err: "user does not exists"});
        
        console.log(user);

        let blog = new Blog({...req.body, user:userId})

        await blog.save();
        return res.send({Blog})
 
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

blogRouter.get('/',async(req,res)=>{
    try {
        const blogs = await Blog.find({});
        return res.send({ blogs })
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

blogRouter.get('/:blogId',async(req,res)=>{
    try {
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)) return res.status(400).send({err: "blogId is invalid"});

        const blog = await Blog.findOne({_id: blogId});
        res.send({blog});

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})


blogRouter.put('/:blogId',async(req,res)=>{
    try {

        const {blogId} = req.params;
        if(!isValidObjectId(blogId)) return res.status(400).send({err: "blogId is invalid"});

        const {title,content} = req.body;

        if (typeof title !== 'string') return res.status(400).send({err: "title is required"});
        if (typeof content !== 'string') return res.status(400).send({err: "content is required"});

        const blog = await Blog.findByIdAndUpdate({_id: blogId},{ title, content},{new : true});

        return res.send({blog});

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

//patch 는 부분적으로 수정할 때 사용한다.
blogRouter.patch('/:blogId/live',async(req,res)=>{
    try {
        
        const {blogId} = req.params;
        if(!isValidObjectId(blogId)) return res.status(400).send({err: "blogId is invalid"});

        const { islive } = req.body;
        if (typeof islive !== 'boolean') return res.status(400).send({err: "boolean islive is required"});

        const blog = await Blog.findByIdAndUpdate(blogId,{ islive },{new : true})

        return res.send({blog});
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})



//모듈 밖에서 들을 수 있게 라우팅 해준다.
module.exports = {
    blogRouter
}