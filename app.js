const { v4: uuidv4 } = require('uuid');
const obj = {
    id: uuidv4(),
    name: '金金',
    address: '新店',
}

console.log(obj);