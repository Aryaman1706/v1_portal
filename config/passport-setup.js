const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const {User}=require('../model/users');
const keys = require('./keys');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for strategy
        clientID:keys.passport.clientID,
        clientSecret:keys.passport.clientSecret,
        callbackURL:'/api/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done)=>{
        async function handle(){
            // check if user already exists
        const user=await User.findOne({email:profile._json.email});
        if(!user){
            // create a new user
            let newUser=new User({
                name: profile.displayName,
                email:profile._json.email,
                phone:"not set currently"
            });
            newUser=await newUser.save();
            console.log('user created: ',newUser);
            done(null,newUser);
        }
        else{
            console.log('user existed as: ',user);
            done(null, user);
        }
        }
        handle();
        
    }
    )
)