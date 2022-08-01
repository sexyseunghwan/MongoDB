const {Router} = require("express");
const commentRouter = Router({ mergeParams: true });//이걸 true 로 해주면 상위의 params 를 불러올 수 있다.***

//const {Comment} = require('../models/Comment');
//const {Blog} = require('../models/Blog');
//const {User} = require('../models/User');
//위의 세개를 하나의 인덱스로 엮음
const {Blog,Comment,User} = require('../models')

const {isValidObjectId} = require('mongoose');


/**
    /comment 보다는
    /blog/blogId/comment 로 하는게 더 바람직한 계층구조이다.
 */
commentRouter.post('/',async (req,res) => {
    try {

        const {blogId} = req.params;
        const {content,userId} = req.body;
        if (!isValidObjectId(blogId)) return res.status(400).send({err: "blogId is invalid"});
        if (!isValidObjectId(userId)) return res.status(400).send({err: "userId is invalid"});
        if (typeof content !== 'string') return res.status(400).send({err: "content is required"});    


        //아래와 같이 두개를 따로 await로 불러오면 시간이 더 소요되게 된다.
        //const blog = await Blog.findByIdAndUpdate(blogId);
        //const user = await User.findByIdAndUpdate(userId);

        //아래와 같이 promise 를 통해서 불러와주면 훨씬 빠르게 작업이 가능해진다.
        const [blog,user] = await Promise.all([
            Blog.findByIdAndUpdate(blogId),
            User.findByIdAndUpdate(userId)
        ]);

        if (!blog || !user) return res.status(400).send({err: "blog or user does not exists"});
        if (!blog.islive) return res.status(400).send({err: "blog is not available"});

        const comment = new Comment({content,user,blog});
        await comment.save();
        
        return res.send({comment});

    } catch(err) {
        return res.status(400).send({err: err.message});
    }
    
})

commentRouter.get('/', async (req,res) => {
    const {blogId} = req.params;

    if(!isValidObjectId(blogId)) return res.status(400).send({err: "blogId is invalid"});

    const comments = await Comment.find({blog : blogId});
    return res.send({comments});
})


//모듈 밖에서 들을 수 있게 라우팅 해준다.
module.exports = {
    commentRouter
}