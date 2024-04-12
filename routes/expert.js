const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const expertSchema = mongoose.Schema({
  expertname:String,
    expertemail:String,
    expertpassword:String,
     expertgender:String
    
        
    })

    expertSchema.plugin(plm)
    const expert = mongoose.model("expert",expertSchema)

module.exports = expert