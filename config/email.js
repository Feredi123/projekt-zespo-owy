const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 't37034178@gmail.com',
        pass: 'avcxhtvrcsemsbxj',
        //pass: 'HSiPWqHZB3T3qEP',
    },
});
   
  
transporter.verify().then(console.log).catch(console.error);


module.exports = transporter;