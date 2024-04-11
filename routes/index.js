var express = require('express');
var router = express.Router();
const userModel  = require("./users")
const remedieModel  = require("./remedie")
const upload = require("./multer")
const passport = require("passport")
const localStrategy = require("passport-local");
// const community = require('./community');
const Community = require('./CommunityModel');
// const expertModel = require("./expertlogin")
// const remedie = require('./remedie');
const remedie = require('./remedie');
// const remedie = require('./remedie');


passport.use(new localStrategy (userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});

router.get("/back",function(req,res,next){
  res.redirect("/home")
})
router.get('/home',isLoggedIn , async function(req, res, next) {
const user = await userModel.findOne({
  username:req.session.passport.user
}).populate("post")
const remedie = await remedieModel.find({});

res.render("home.ejs",{user,remedie})
});
router.get('/product',isLoggedIn,  async function(req, res, next) {
  res.render('product.ejs' );
});
router.get('/remedie',isLoggedIn,  async function(req, res, next) {
  res.render('remedie.ejs' );
});
router.get('/register',isLoggedIn,  async function(req, res, next) {
  res.redirect('/register' );
});
router.get('/login',isLoggedIn,  async function(req, res, next) {
  res.redirect('/login' );
});
router.get('/homehtml', async function(req, res, next) {
  res.render('homehtml.ejs' );
});
router.get('/createRemedie',isLoggedIn,  async function(req, res, next) {
  res.render('createRemedie.ejs' );
});

// router.get('/remedieSarch',isLoggedIn,  async function(req, res, next) {
//   res.render('remedieSarch.ejs' );
// });



router.get('/community',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  const common  = await  Community.find({});

// console.log("Modified Like Array Length:", common.like.length);

  res.render('community.ejs',{common,user} );
});

router.get('/profile',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("post")
  
  const remedie = await remedieModel.find({})


// res.send(user)
  res.render('profile.ejs',{user,remedie} );
});

router.get('/remedieSearch',isLoggedIn,  async function(req, res, next) {

  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("post")
  const remedie = await remedieModel.find({}).populate("user")
  // console.log()

  res.render('remedieSearch.ejs',{user,remedie} );
});

router.post('/remedieCreate',isLoggedIn,upload.single("image"), async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
const remedie = await remedieModel.create({
  remedieName:req.body.remedieName,
   ingredients:req.body.ingredients,
   dosage:req.body.dosage,
   description:req.body.description,
   image:req.file.filename,
   Researchfile:req.file.filename
})
remedie.user = user._id;
user.post.push(remedie._id);

await user.save();
await remedie.save();

res.redirect("/home");

});
router.post('/sharereview',isLoggedIn,upload.single("image"), async function(req, res, next) {

try {
  // const user = await userModel.findOne({
  //   username:req.session.passport.user
  // });
  // // console.log(req.file.filename);
  // const community = await new Community({
  //   review : req.body.review,
  //   // reviewImage:req.file.filename,
  //   user:user._id
  // }).save();
  // console.log('====================================');
  // console.log(community);
  // console.log('====================================');
  const c = await new Community({
    review : req.body.review,
    reviewImage:req.file.filename

  }).save();
  console.log(c);
} catch (error) {
  console.log(error);
}
res.redirect("/community")
})


router.get("/searchUser/:name",async function(req, res, next){
  try {
    var data = req.params.name
    const allUser = await remedieModel.find({
      remedieName:{
        $regex:data,
        $options:"i"
      }
    })
    
    res.status(200).json(allUser)
  } catch (error) {
    console.log(error);
  }
  })
  router.get('/remedie/:remedi',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user})

    const remedie = await remedieModel.findOne({_id:req.params.remedi}).populate("user")
    //  console.log( remedie)
      res.render('remedie.ejs',{remedie,user} );
    });
    

router.get("/remedieReport/:remedieId", async function(req, res, next) {
  try {
    const remedie = await remedieModel.findById(req.params.remedieId);

    if (remedie.reportCount < 5) {
      remedie.reportCount++;
      await remedie.save();
      res.redirect("/remedieSearch")
      // res.status(200).json(remedie);
    } else {
      // If report count reaches 5, delete the remedy
     const remedie =  await remedieModel.findByIdAndDelete(req.params.remedieId)
     await remedie.save()
     res.redirect("/remedieSearch")
      // res.status(200).json({ message: "Remedy deleted due to excessive reports." });
    }
  } catch (error) {
    console.log(error);
    res.redirect("/remedieSearch")
    // res.status(500).json({ error: "Internal Server Error" });
  }
});
// /remedie/<%=remedie._id %>


router.get("/like/:id",isLoggedIn,async function(req,res,next){
  // console.log(req.params.id);
  const user = await userModel.findOne({username:req.session.passport.user})
  const common  = await Community.findOne({_id:req.params.id});

  
if(common.like.indexOf(user._id) === -1) {
  common.like.push(user._id);

}
else{
 let index =  common.like.indexOf(user._id) 
 common.like.splice(index, 1);
}
await common.save();

console.log("Modified Like Array Length:", common.like.length);

// res.render("community",{user,common})
      res.redirect("/community")
     })
     router.get("/remedielike/:remedieId",isLoggedIn,async function(req,res,next){
      // console.log(req.params.id);


      const user = await userModel.findOne({username:req.session.passport.user})
      const remedie  = await remedieModel.findOne({_id:req.params.remedieId});
    
      
    if(remedie.remedielike.indexOf(user._id) === -1) {
      remedie.remedielike.push(user._id);
    
    }
    else{
     let index =  remedie.remedielike.indexOf(user._id) 
     remedie.remedielike.splice(index, 1);
    }
    await remedie.save();
    
    // console.log("Modified Like Array Length:", remedielike.length);
    
    // res.render("community",{user,common})
          res.redirect("/remediesearch")
          // res.status(200).json(remedie)
         })
     

router.get("/get/all",async function(req, res, next){
  try {
    const allUser = await remedieModel.find();
    
    res.status(200).json(allUser)
  } catch (error) {
    console.log(error);
  }
  })


router.post("/register",async function(req,res,next ){
const userdata = new userModel({
    username :req.body.username,
    email:req.body.email,
    gender:req.body.gender
  })
 
  
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/home")
  
    })
  })
})

 
router.post("/login" , passport.authenticate("local",{
  successRedirect:"/home",
  failureRedirect:"/"

}),function(req,res){ 
})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err) return next(err)
    res.redirect("/")
  })
})


function isLoggedIn(req,res,next){
if(req.isAuthenticated ()){
  return next()
}
res.redirect("/")
}




/////expert session /////
router.get('/experthome',  async function(req, res, next) {
  res.render('experthome.ejs' );
});
router.get('/expertindex',  function(req, res, next) {
  res.render('expertindex' );
});
router.get('/expertremedie',  async function(req, res, next) {
  res.render('expertremedie.ejs' );
});
router.get('/expertprofile',  async function(req, res, next) {
  res.render('expertprofile.ejs' );
});

 

module.exports = router;
