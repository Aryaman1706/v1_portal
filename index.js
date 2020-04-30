const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const passportSetup = require('./config/passport-setup');
const path = require('path');

const app=express();

const user=require('./routes/user');
const message=require('./routes/message');
const auth=require('./routes/auth');
const authGoogle=require('./routes/auth-google');
const keys = require ('./config/keys');

// MIDDLEWARE   

app.use(express.json());

// initialize passport
app.use(passport.initialize());


app.use('/api/user',user);
app.use('/api/message',message);
app.use('/api/auth',auth);
app.use('/api/auth/google',authGoogle);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

mongoose.connect(keys.dbKey)
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 
