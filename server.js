
// vs code로 터미널을 열어줘서  node 파일이름.js 로 실행시켜줄 수 있다.

//서버가 연결이 된것임
const express = require('express');

const app = express();

app.get('/',function(req,res) {
    return res.send('hello word 123 123');
})

app.listen(3000,function(){
    console.log('server listen on port 3000');
})


