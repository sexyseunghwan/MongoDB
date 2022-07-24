
//callback함수로 썻을경우에는 깊이가 점점 깊어지면 헷갈려서 오류가 발생될 확률이 높아지지만 promise 함수로 사용하는 경우에는 깊이가 깊어져도
//오류 발생확률이 현저하게 줄어든다. 

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

addSum(10,1)
    .then((sum1) => {
        console.log({sum1})
        return addSum(sum1,'test')
    })
    .then((sum2) => console.log({sum2}))
    .catch((error) => console.log({error}))

//또한 오류처리도 한번만 해주면 된다 callbackhell 걱정하지 않아도 된다.


