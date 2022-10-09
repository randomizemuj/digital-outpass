const passport = require('passport');
// authentication using passport
const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'registration_no'
  },
    function(registration_no,password,done)
    // find a user ans establish the identity
    {
        User.findOne({registration_no:registration_no},function(err,user){
            if (err)
            {
                console.log('error in finding user --> Passport');
                return done(err);
            }
            if (!user || user.password!=password)
            {
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        })
    }
));

//serializing the user to decide which key has to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// decerializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            console.log('error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});
// check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in then pass on the request to the next func(controllers action)
    if (req.isAuthenticated())
    {
        return next();
    }
    // if the user is not signed in
    return res.redirect ('/users/sign-in');

}


passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated){
        //req.user contains the current signed in user from the current session cookie 
        //and we are just sending this to locals for the views
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;