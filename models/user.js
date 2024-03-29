const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        reqired : true
    },
    password:{
        type:String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    mobile:{
        type: String,
        required : true
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    height:{
        type : Number,
        required: true
    },
    guardian:{
        type:String,
        required: true
    },
    residence:{
        type : String,
        required: true
    },
    dob:{
        type: Date,
        required:true
    },
    bloodgroup:{
        type: String,
        required: true
    },
    weight:{
        type : String,
        required: true
    }

},{
    timestamps : true
});

const User = mongoose.model('User',userSchema);

module.exports = User;