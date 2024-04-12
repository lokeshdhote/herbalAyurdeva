const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const expertSchema =  mongoose.Schema({
  expertname:String,
    expertemail:String,
    expertpassword:String,
     expertgender:String
    
        
    })

    expertSchema.plugin(plm)
  

module.exports = mongoose.model("expert",expertSchema)