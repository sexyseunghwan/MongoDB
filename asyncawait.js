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


//아래와 같이 try catch 로 감싸줄 수 있다.
//await 를 쓰려면 상위 함수에 async 가 있어야 한다.
const totalSum = async ()=>{
    try {
        let sum = await addSum(10,'test')
        let sum2 = await addSum(sum,20)
        console.log({sum, sum2})
    } catch(err) {
        console.log({err})
    }
}

totalSum();
