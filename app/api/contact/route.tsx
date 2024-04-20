// app/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // https://nodemailer.com/smtp/
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_MY_GMAIL,
      pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
    },
    secure: false, 
  });

  const { name, email, message } = req.body;

  if (!message || !name || !message) {
    return res
      .status(400)
      .json({ message: 'Please fill out the necessary fields' });
  }

  const mailData = {
    from: email,
    to: email,
    subject: `Message from ${name}`,
    text: `${message} | Sent from: ${email}`,
    html: `<div>${message}</div><p>Sent from: ${email}</p>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err: Error | null, info) => {
      if (err) {
        reject(err);
        return res
          .status(500)
          .json({ error: err.message || 'Something went wrong' });
      } else {
        resolve(info.accepted);
        res.status(200).json({ message: 'Message sent!' });
      }
    });
  });

  return;
}
