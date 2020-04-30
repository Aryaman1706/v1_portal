const Joi = require('joi');
const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/',async (req,res)=>
{
    let user = await User.findOne({ email: req.body.email });
    if(user.password!==req.body.password) return res.send('Not valid');
    const token = user.generateAuthToken();
    res.json({token});
});

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      // console.log(user);
      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router; 