const http = require("http");
const mongoose = require("mongoose");


// 連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel')
    .then((res) => {
        console.log('資料庫連線成功');
      
    })
    .catch(err => {
      console.log(err);
    })
  
// 設定監聽
const requestListener = (req,res)=>{
    console.log(req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);