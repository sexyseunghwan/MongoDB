
// vs code로 터미널을 열어줘서  node 파일이름.js 로 실행시켜줄 수 있다.

//서버가 연결이 된것임
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/User')


const MONGO_URI = 'mongodb+srv://seunghwanshin:Sh%40%23170125@mongodbtutorial.yr66m.mongodb.net/test';

const server = async () => {
   try {
       await mongoose.connect(MONGO_URI)
       console.log('MongoDB connected')
       app.use(express.json())//req 에서 정보를 받아올때 json 으로 받아오기 때문에 파싱오류가 발생하기 때문에 변환 함수를 써줘야 한다.(**)

       app.get('/user', async (req,res)=>{
           //return res.send({ users: users})//중복호출방지를 위해 return 을 써준다.

       const users = await User.find({});
       return res.send({ users })
       } catch(err) {
         console.log(err);
         return res.status(500).send({err: err.message})
       }
    })
    
    app.get('/user/:userId', async(req,res)=>{
        
        try {
            const { userId } = req.params;

            //isValidObjectId 오브젝트 아이디가 맞는 형식인지 아닌지 확인해준다.
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err: 'invalid userId'})

            const user = await User.findOne({_id: userId });

            return res.send({user});
        } catch(err) {
            console.log(err);
            return res.status(500).send({err: err.message})
        }
    })


    app.post('/user',async (req,res) =>  {
        try {
            let {username,name} = req.body;
            //아래 두개의 표현이 위의 하나의 표현과 같은 것이다.
            //let username = req.body.username;
            //let name = req.body.name;
            
            if (!username) return res.status(400).send({err: 'username is required'});
            if (!name || !name.first || !name.last) return res.status(400).send({err: 'Both first and last names are required'});

            const user = new User(req.body);
            await user.save();//유저를 저장해준다.
            return res.send({ user })
        } catch(err) {
            console.log(err);
            return res.status(500).send({err: err.message})
        }
    })
    

    app.delete('/user/:userId', async (req,res) => {
        try {
            const { userId } = req.params;
            
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err: 'invalid userId'})

            const user = await User.findOneAndDelete({_id: userId});
            return res.send({user})

        } catch(err) {
            console.log(err);
            return res.status(500).send({err: err.message})
        }
    })


    app.put('/user/:userId', async (req,res) => {
        try {
            const { userId } = req.params;

            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err: 'invalid userId'})
            
            const {age} = req.body;
            
            if (!age) return res.status(400).send({err: 'age is required'});
            if (typeof age !== 'number') return res.status(400).send({err: 'age must be a number'});

            const user = await User.findByIdAndUpdate(userId, { $set: { age }}, {new : true});// new 연산자는 바로 업데이트 이후의 리턴을 해준다.
            return res.send({user})
        } catch(err) {
            console.log(err);
            return res.status(500).send({err: err.message})
        }
    })


    //서버포트 설정
    app.listen(3000,()=>{
        console.log('server listen on port 3000');
    })
   } catch(err) {
    console.log(err)
   }
}

server();//서버 생성





