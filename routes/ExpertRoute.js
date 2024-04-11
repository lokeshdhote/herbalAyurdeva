const express = require("express");
const router = express.Router();

router.get("/get",(req,res,next)=>{
    res.render("Expert.ejs")
})

router.get("/back",function(req,res,next){
    res.redirect("/expert/home")
  })
router.get('/home',  async function(req, res, next) {
    res.render('experthome.ejs' );
  });
  router.get('/index',  function(req, res, next) {
    res.render('expertindex' );
  });
  router.get('/remedie',  async function(req, res, next) {
    res.render('expertremedie.ejs' );
  });
  router.get('/profile',  async function(req, res, next) {
    res.render('expertprofile.ejs' );
  });
  
module.exports = router;