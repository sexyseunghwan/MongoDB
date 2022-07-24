
//promise 형식으로 쓰면 좋은점은 callback같은 경우에는 호출되지 않아야할 로직이 자꾸 호출되는듯 하는 상황이 발생하는데
//promise 는 그렇지 않아서 callback 보다는 실수를 안할 수 있다. 
// npm run dev 를 해줘야 노드몬이 실행된다.


const addSum = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (typeof a !== 'number' || typeof b !== 'number')  {
                reject('a,b must be numbers')
            }
            resolve(a+b)
        }, 3000);
    })
}

addSum(10,20)
    .then((sum) => console.log({sum}))
    .catch((error) => console.log({error}))