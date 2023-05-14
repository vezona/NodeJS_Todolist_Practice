const mongoose = require("mongoose");

// 設定 schema
const roomSchema = {
    name: String,
    price: {
        type: Number,
        required: true, // 也可以寫這樣 [true, "價格必填"]，字串帶自己想傳的字
    },
    rating:Number,
}

// 設定 Model 
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;