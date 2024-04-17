import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_MY_GMAIL,
        pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MY_GMAIL,
      to: 'nemotogaku1@gmail.com',
      subject: '問い合わせ',
      text: `送信者：${email}\n\n内容:${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: '送信成功' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '送信失敗' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
