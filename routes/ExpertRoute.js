const express = require("express");
const router = express.Router();
const expertModel = require("./expert");
const passport = require("passport");
const localStrategy = require("passport-local")

passport.use(new localStrategy(expertModel.authenticate()));

router.get("/get", (req, res, next) => {
    res.render("Expert.ejs");
});

router.get("/back", function(req, res, next) {
    res.redirect("/expert/home");
});

router.get('/home', async function(req, res, next) {
    res.render('experthome.ejs');
});

router.get('/index', function(req, res, next) {
    res.render('expertindex');
});

router.get('/remedie', async function(req, res, next) {
    res.render('expertremedie.ejs');
});

router.get('/profile', async function(req, res, next) {
    res.render('expertprofile.ejs');
});

router.post("/register", async function(req, res, next) {
    console.log( req.body.expertname)
    console.log(req.body.expertemail)
    console.log(req.body.expertgender)
    const expert = new expertModel({
        expertname: req.body.expertname,
        expertemail: req.body.expertemail,
        expertgender: req.body.expertgender
    });
    console.log(expert)

    expertModel.register(expert, req.body.expertpassword)
        .then(function(registereduser) {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/expert/home");
            });
        })
        .catch(function(err) {
            // Handle registration error
            console.error(err);
            res.redirect("/expert/index");
        });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/expert/home",
    failureRedirect: "/expert/index"
}));

router.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/expert/index");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/expert/index");
}

module.exports = router;
