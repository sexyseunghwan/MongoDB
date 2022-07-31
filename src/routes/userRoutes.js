const { Router } = require('express');
const userRouter = Router();
const { User } = require('../models') 
const mongoose = require('mongoose');


userRouter.get('/', async (req,res)=>{
    //return res.send({ users: users})//중복호출방지를 위해 return 을 써준다.
    try {
        const users = await User.find({});
        return res.send({ users })
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

userRouter.get('/:userId', async(req,res)=>{
    
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


userRouter.post('/',async (req,res) =>  {
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


userRouter.delete('/:userId', async (req,res) => {
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


userRouter.put('/:userId', async (req,res) => {
    try {
        const { userId } = req.params;

        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err: 'invalid userId'})
        
        const {age,name} = req.body;
        
        if (!age && !name) return res.status(400).send({err: 'age or name is reqiured'})
        //if (!age) return res.status(400).send({err: 'age is required'});
        if (age && typeof age !== 'number') return res.status(400).send({err: 'age must be a number'});
        if (name && typeof name.first !== 'string' && typeof name.last !== 'string') return res.status(400).send({err: 'first and last name are strings'});

        //null 입력을 막기 위해 사용함
        //let updateBody = {};
        //if (age) updateBody.age = age;
        //if (name) updateBody.name = name;

        //const user = await User.findByIdAndUpdate(userId, { $set: { age }}, {new : true});// new 연산자는 바로 업데이트 이후의 결과를 리턴을 해준다. -> 아래와 같이 set 을 제외시켜
        //const user = await User.findOneAndUpdate(userId, {age,name},{new : true});
        //const user = await User.findOneAndUpdate(userId, updateBody ,{new : true});
        
        //한번에 업데이트를 해주면 User갹채애서 지정해준 제약조건을 안먹을 상황이 만들어질 수 있다 => 몽구스가 확인을 하지 못하게 되는 문제가 발생
        //이럴때는 디비에 한번 다녀와서 유저 객체를 가져오고 그다음에 업데이트를 해주는 방법이 존재한다. 그렇게 되면 몽구스가 확인을 할 수 있게되는것이다.
        
        let user = await User.findById(userId);
        //수동으로 age와 name 을 바꿔준다.
        if (age) user.age = age;
        if (name) user.name = name;
        

        await user.save();//몽구스가 바뀐부분만 찾아서 처리해준다. -> update 가 호출이 된것이다.
        
        return res.send({user})
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

//모듈 밖에서 들을 수 있게 라우팅 해준다.
module.exports = {
    userRouter
}