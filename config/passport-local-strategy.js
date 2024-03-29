const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email,password,done){
        //find the user and establish identity
        const user = await User.findOne({email:email});
            try{
                if(!user || user.password!= password){
                    console.log("Invalid Username/password");
                    return done(null,false);
                }
                return done(null,user);
            }
            catch(err){
                console.log("Error in finding the user ---> Passport");
                return done(err);
            }
    }
));

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializeUser (decodes the cookie)
passport.deserializeUser(async function(id,done){
    const user = await User.findById(id);
        // if(err){
        //     console.log("Error in finding the user");
        //     return done(err);
        // }
    // return done(null,user);
    try{
        return done(null,user);
    }
    catch(err){
        console.log("Error in login session")
        return done(err);
    }

    });

//check if the user is authenticated

passport.checkAuthentication = function (req,res,next){
    //if the user is signed in, then pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in

    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;