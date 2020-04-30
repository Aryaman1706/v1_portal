const express=require('express');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const { User,validate,userSchema}=require('../model/users');
const { Message } = require('../model/messages');
const auth = require('../middleware/auth')

const router=express.Router();

router.get('/:id',async (req,res)=>{
    const user= await User.findById(req.params.id);
    if(!user) res.status(404).send('Not found');
    res.send(user);
});

router.post('/',async(req,res)=>{
    let user=new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        position: req.body.position
    });
    
    user=await user.save();
    res.send(user);
});

router.put('/:id',async (req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        position: req.body.position
    },{new:true})
    res.json(user);
});

router.put('/profile/me',auth,async (req,res)=>{
    const user= await User.findByIdAndUpdate(req.user._id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    },{new:true});

    res.json(user);

});


// for manipulating marks
router.put('/addmarks/:id',async(req,res)=>{
    let user= await User.findById(req.params.id);
    user.marks.push(req.body.marks);
    user=await user.save();
    res.send(user);
});

router.put('/editmarks/:id',async(req,res)=>{
    let user= await User.findById(req.params.id);
    user.marks.pop();
    user.marks.push(req.body.marks);
    user=await user.save();
    res.send(user);
});

router.put('/star/:id',auth,async(req,res)=>{
    let user= await User.findById(req.user._id);
    const message= await Message.findById(req.params.id);
    const length = user.staredMessages.length ;
    var i;
    for ( i=0; i< length; i++) {
        if( user.staredMessages[i]._id == req.params.id ) {
            console.log("message already stared");
            break;
        }
    };
    if( i === length ) {
        user.staredMessages.push(message);
        user=await user.save();
    };
    
    res.send(user);
});

router.put('/star_remove/:id',auth,async(req,res)=>{
    let user= await User.findById(req.user._id);
    const length = user.staredMessages.length ;
    var i;
    for( i=0; i < user.staredMessages.length; i++) {
        if(user.staredMessages[i]._id == req.params.id){
            console.log("equal")
            user.staredMessages.splice(i,1);
            user = user.save();
            break;
        }
    }
    if ( i === length ) {
        console.log("message doesnot exist");
    }
   
    res.json(user);
});

module.exports=router;