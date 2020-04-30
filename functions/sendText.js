const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');
const {Message}=require('../model/messages');
const Nexmo = require('nexmo');
const keys =require('../config/keys');

const config= require('config');

async function sendText(message){

    const nexmo = new Nexmo({
      apiKey: keys.nexmo.apiKey,
      apiSecret: keys.nexmo.apiSecret
    });
    const from = 'Society';
  
    const users=await User.find({position:message.to});
    users.forEach(
       function(user){
        const to = user.phone;
        const text = message.statement;
    
        nexmo.message.sendSms(from, to, text);
       }
    )
  }

  module.exports=sendText;