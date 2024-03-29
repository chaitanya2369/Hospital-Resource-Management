const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const db = require('./config/mongoose');
// const User = require('./models/user');

//used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { Cookie } = require('express-session');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


app.use(express.urlencoded());
app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'hospitalManagement',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
        store: MongoStore.create({
            mongoUrl:'mongodb://127.0.0.1/hospital_usersdb',
            autoRemove:'disabled'
        },
        function(err){
            console.log("Error Encountered");
        })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/home'));

app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to the server!!! ",err);
        return;
    }
    console.log("Hurray! The server is running at port: ",port);
})