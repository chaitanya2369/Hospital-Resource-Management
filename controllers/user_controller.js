const Hospitals = require('../models/hospitals');
const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('profile',{
        title: 'Profile page'
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in',{
        title: "sign_in"
    })
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign_up',{
        title: "signUp"
    })
}

module.exports.create =  async function(req,res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            try {
                const createdUser = await User.create(req.body);
                return res.redirect('/users/sign-in');
            } catch (err) {
                console.error("Error in creating user signing in", err);
                return res.status(500).send("Error creating user");
            }
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error("Error in finding user in signing up", err);
        return res.status(500).send("Error finding user");
    }
}

module.exports.renderHospitalspage = async function(req,res){
    res.render('hospitals');
}

module.exports.createHospital = async function (req,res){
    console.log(req.body);
    const createdHospital = await Hospitals.create(req.body);
    return res.redirect('back');
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            // Handle the error here
            console.error(err);
        }
        // Redirect the user after logout
        res.redirect('/');
    });
}
