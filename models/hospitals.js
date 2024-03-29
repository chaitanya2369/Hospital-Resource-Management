const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type : String,
        required : true
    },
    mobile:{
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    rating: {
        type : Number,
        required : true
    },
    resource : {
        type : Array,
        required : true
    },
    services : {
        type : Array,
        required : true
    },
    location:{
        type : String,
        required : true
    }
})

const Hospitals = mongoose.model('Hospitals',hospitalSchema);

module.exports = Hospitals;