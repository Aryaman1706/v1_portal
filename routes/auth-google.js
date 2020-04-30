const router = require('express').Router();
const passport = require('passport');
const {User}= require('../model/users')



// auth login
// router.get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    // res.send("logged out");
});

// auth with google+
router.get('/', passport.authenticate('google', {
    scope: ['profile','email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/redirect', passport.authenticate('google'), (req, res) => {
    
    const user=req.user;
    const token=user.generateAuthToken();
    res.json({token});

    
});

module.exports = router;
