const {Router} = require("express");
const commentRouter = Router({ mergeParams: true });//이걸 true 로 해주면 상위의 params 를 불러올 수 있다.***
const {Comment} = require('../models/Comment');

/**
    /comment 보다는
    /blog/blogId/comment 로 하는게 더 바람직한 계층구조이다.
 */

commentRouter.post('/:commentId',async (req,res) => {
    return res.send(req.params);
})

//commentRouter.get('/')


//모듈 밖에서 들을 수 있게 라우팅 해준다.
module.exports = {
    commentRouter
}