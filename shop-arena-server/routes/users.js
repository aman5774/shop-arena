const express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    jwt     = require("jsonwebtoken"),
    config = require("../config/database"),
    User    = require("../models/user");

//=========================================================================================
// Registration Route
//=========================================================================================
router.post("/register", (req, res, next) =>{
    let newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    });

    const email = req.body.email;
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(user){
            return res.json({status:false, message:"User Already Registered"});
        } else{
            User.addUser(newUser, (err, user) =>{
                if(err){
                    res.json({status:false, message:"User Registration Failed", error:err})
                } else{
                    res.json({status:true, message:"User Registration Successful"})
                }
            });
        }
    });
   

});

//=========================================================================================
// Authenticate Route
//=========================================================================================
router.post("/authenticate", (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({status:false, message:"User not found"});
        }
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    status:true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    },
                    message:"Login Successful"
                });
            } else {
                return res.json({status:false, message:"Wrong Password"});
            }
        });
    });
});

//=========================================================================================
// Profile Route
//=========================================================================================
router.get("/profile", passport.authenticate('jwt',{session:false}), (req, res, next) =>{
    res.status(200).json({message:"profile Route", user: req.user});
});



module.exports = router;