
// vs code로 터미널을 열어줘서  node 파일이름.js 로 실행시켜줄 수 있다.

//서버가 연결이 된것임
const express = require('express');

const app = express();

app.use(express.json())//req 에서 정보를 받아올때 json 으로 받아오기 때문에 파싱오류가 발생하기 때문에 변환 함수를 써줘야 한다.(**)

// app.get('/blog',function(req,res) {
//     return res.send('hello word 123 123');
// })

//const users = [{name:"seunghwan",age:30}];
const users = [];//유저 객체가 들어가줄 배열


app.get('/user',function(req,res){
    return res.send({ users: users})//중복호출방지를 위해 return 을 써준다.
})

app.post('/user',function(req,res){
    //users.push({name:'shin',age:30})
    //console.log(req.body) req 객체를 잘 받아오는지 확인한다 => 파싱이 잘 되서 읽을 수 있는 지 체크해준다.

    users.push({name:req.body.name,age:req.body.age})
    return res.send({success:true})
})

app.listen(3000,function(){
    console.log('server listen on port 3000');
})

