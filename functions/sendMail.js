const nodemailer=require('nodemailer');
const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');
const {Message}=require('../model/messages');
const Nexmo = require('nexmo');
const keys = require('../config/keys')

const config= require('config');

async function sendMail(message)
{
    const users=await User.find({position:message.to});
     console.log(users);
     console.log(message);
    users.forEach(
        
      // NODEMAILER WORK
      async function (user) {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: keys.email.emailAddress,
                pass: keys.email.password
              }
            });
          
            let info = await transporter.sendMail({
              from: keys.email.emailAddress, // sender address
              to: JSON.stringify(user.email), // list of receivers
              subject: message.subject , // Subject line
              text: message.statement, // plain text body
            //   html: "<b>Hello world?</b>" // html body
            });
          
            console.log("Message sent: %s", info.messageId);          
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
    )

}




module.exports=sendMail;
