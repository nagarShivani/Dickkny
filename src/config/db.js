const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`MongoDB Connected`);
}).catch((err)=>{
    console.log("MongoDb Err : ",err?.message)
})
module.exports = mongoose;