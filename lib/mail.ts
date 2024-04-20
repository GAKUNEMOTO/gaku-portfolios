const nodemailer = require("nodemailer");

const transportar = 
    nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,

        auth: {
            user: process.env.NEXT_PUBLIC_MY_GMAIL,
            pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
          },
    });

    