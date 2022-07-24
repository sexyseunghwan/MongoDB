// const addSum = function(a,b,callback){
//     setTimeout(function(){
//         if (typeof a !== 'number' || typeof a !== 'number') callback('a,b must be numbers')
//         callback(undefined,a+b)
//     }, 3000);
// }

//위의 코드를 es6 버전부터 아래와 같이 화살표 방식으로 쓸 수 있다.

//여기서 유의해야 할 것은 a,b 는 변수지만 callback은 함수다 즉 매개변수로 함수가 들어간 것이다.
//콜백함수는 여러번 호출될수 있으므로 return 을 기입해줘서 여러번 호출을 막는다.
const addSum = (a,b,callback) => {
    setTimeout(()=>{
        if (typeof a !== 'number' || typeof a !== 'number') return callback('a,b must be numbers')
        return callback(undefined,a+b)
    }, 3000);
}

let callback = (error,sum) => {
    if (error) return console.log({error});
    console.log({sum});
}

addSum('aooke',20,callback);