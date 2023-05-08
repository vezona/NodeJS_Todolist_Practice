const correctTest = (name, score)=>{
    return new Promise((resolve, reject)=>{
        console.log('批改作業中');
        setTimeout(()=>{
            if(score >= 60){
                resolve({
                    name,
                    score
                })
            }else {
                reject('退學！')
            }
           
        }, 2000)
    })
};

const checkReward = (data)=>{
    return new Promise((resolve, reject)=>{
        console.log('檢查獎品中');
        setTimeout(()=>{
            if(data.score >= 90){
                resolve({
                    name: data.name,
                    reward: '品學兼優特等獎'
                })
                // 也可以直接寫成
                // resolve(`${data.name}獲得品學兼優特等獎`)
            } else if(data.score >= 70 && data.score < 90) {
                resolve({
                    name: data.name, 
                    reward: '表現不錯優良獎'
                })
            } else {
                resolve({
                    name: data.name, 
                    reward: '60分以上及格普獎'
                })
            }
        }, 1000)
    })
}

correctTest('金金', 65)
  .then(data => checkReward(data))
  .then(data => console.log(`${data.name}獲得${data.reward}`))
  .catch(err => console.log(err))