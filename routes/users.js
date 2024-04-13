const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost:27017/herbalAuryeda")

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
