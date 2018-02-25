const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

var UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false,
        enum:['male','female','other']
    },
    contact_number:{
        type:String,
        required:false
    },
    registration_date:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isMaster:{
        type:Boolean,
        default:false
    }
});

const User = module.exports = mongoose.model("User",UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email:email};
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}
