
const addSum = (a,b,callback) => {
    setTimeout(()=>{
        if (typeof a !== 'number' || typeof a !== 'number') return callback('a,b must be numbers')
        return callback(undefined,a+b)
    }, 3000);
}


//아래 코드를 밑에 매개변수로 바로 쓸 수 있다.
// let callback = (error,sum) => {
//     if (error) return console.log({error});
//     console.log({sum});
// }

//addSum('aooke',20,callback);


//아래와 같이 그냥 쓰기 가능하다.
addSum(10,20,(error1,sum1) => {
    if (error1) return console.log({error1});
    console.log({sum1});
    addSum(sum1,15,(error2,sum2) => {
        if (error2) return console.log({error2})
        console.log({sum2})
    })
});

//위와 같이 괄호안에 괄호안에 계속해서 들어가다 보면 오류 잡기가 매우 어려워진다.
//callback 실수까지 더해지면 엄청 복잡하지게 된다.