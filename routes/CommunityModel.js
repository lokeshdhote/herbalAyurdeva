const  mongoose = require("mongoose");

const ComunityModel = mongoose.Schema({
 review : String,
 reviewImage : String,
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" // Assuming there's a user model
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user" // Assuming there's a user model
    }
  ]
});

const Community = mongoose.model("Community",ComunityModel);
module.exports = Community