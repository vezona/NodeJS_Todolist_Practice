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

// 設定 schema
const roomSchema = {
    name: String,
    price: {
        type: Number,
        required: true, // 也可以寫這樣 [true, "價格必填"]，字串帶自己想傳的字
    },
    rating:Number,
}

const versionKey = new mongoose.Schema(
    {  // 第一個參數，放要新增的欄位型別
        name: String,
        price: {
            type: Number,
            required: true, 
        },
        rating:Number,
    },
    {  // 第二個參數，放預設欄位
        versionKey: false
    }
)

// 設定 Model 
const Room = mongoose.model('Room', roomSchema)

// 建立實例/實體
const testRoom = new Room({
    name: '總統套房',
    price:2000,
    rating:4.5
})

// 存進資料庫
testRoom.save()
    .then(() => {
        console.log('成功');
    }).catch(err => {
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