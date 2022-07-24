console.log('start')

setTimeout(function(){
    console.log('your meal is ready')
},3000);


console.log('end')

//동기적 관점에서 보면 위코드는 start 이후에 3초를 기다린 이후에 end 를 뽑아야할것 같지만 end가 출력되고 you  가 출력된다.