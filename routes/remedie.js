const  mongoose = require("mongoose")

// const plm = require("passport-local-mongoose")


const remedieSchema = mongoose.Schema({
  remedieName:String,
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   ingredients:String,
   dosage:String,
   description:String,
   image:String,
   researchfile:String,
   reportCount: {
    type: Number,
    default: 0
  },
  verification: {
    type: Boolean,
    default: false
  },
  remedielike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user" // Assuming there's a user model
    }
  ]
})

// remedieSchema.plugin(plm)
module.exports = mongoose.model("remedie",remedieSchema)
