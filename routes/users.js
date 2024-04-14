const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

mongoose.connect("mongodb+srv://lokeshdhote2004:1IAIRPQOlkBEBofY@cluster0.kn0pnk1.mongodb.net/")

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"remedie"
       }],
       gender:String
    
        
    })

userSchema.plugin(plm)
module.exports = mongoose.model("user",userSchema)
