// vs code로 터미널을 열어줘서  node 파일이름.js 로 실행시켜줄 수 있다.

//서버가 연결이 된것임
const express = require('express');
const app = express();

//인덱스 js 에 합쳐놓음
//const { userRouter } = require('./routes/userRoutes')// 라우팅 된 정보를 받아온다.
//const { blogRouter } = require('./routes/blogRoutes')// 라우팅 된 정보를 받아온다.
//const { commentRouter } = require('./routes/commentRoute')// 라우팅 된 정보를 받아온다.



//=> 합치면 아래와 같이 된다.
const {blogRouter,commentRouter,userRouter} = require('./routes');

const mongoose = require('mongoose');
//const { User } = require('./models/User') -> 라우팅으로 연결을 해주면 이 정보는 더이상 필요 없어진다.

const MONGO_URI = 'mongodb+srv://seunghwanshin:Sh%40%23170125@mongodbtutorial.yr66m.mongodb.net/test';

const server = async () => {
   try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
    app.use(express.json())//req 에서 정보를 받아올때 json 으로 받아오기 때문에 파싱오류가 발생하기 때문에 변환 함수를 써줘야 한다.(**)
    mongoose.set('debug',true);// 이렇게 해주면 mongoose 가 애플리케이션에서 어떤 쿼리를 날렸는지 보여주게 된다.


    //라우팅된 정보를 토대로 미들웨어 설정
    app.use('/user',userRouter);//url 이 user로 시작하면 userRouter 로 연결하라는 뜻이 된다.
    app.use('/blog',blogRouter);//url 이 blog로 시작하면 userRouter 로 연결하라는 뜻이 된다.
    app.use('/blog/:blogId/comment',commentRouter);//url 이 comment로 시작하면 userRouter 로 연결하라는 뜻이 된다.


    //서버포트 설정
    app.listen(3000,()=>{
        console.log('server listen on port 3000');
    })
   } catch(err) {
    console.log(err)
   }
}

server();//서버 생성