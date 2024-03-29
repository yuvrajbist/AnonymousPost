import nodemailer from 'nodemailer'
import useUser from '@/hooks/useUser';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import prisma from '@/libs/prismadb';
import { addHours } from 'date-fns';


const sendMail = async ({ email, emailType, userId }: any) => {
  // const EMAIL_SECRET = 'bkhhkbjhbjhbjhb';
  // console.log("Email sent")
  // jwt.sign(
  //   {
  //     userId,
  //   },
  //   EMAIL_SECRET,
  //   {
  //     expiresIn: '1d',
  //   },
  //   (err, emailToken) => {
  //     const url = `http://localhost:3000/confirmation/${emailToken}`;

  //     transporter.sendMail({
  //       to: email,
  //       subject: 'Confirm Email',
  //       html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
  //     });
  //   },
  // );
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const { data: fetchedUser } = useUser(userId);
    const url = `http://localhost:3000/verifyemail?token=${hashedToken}`
    const date = addHours(new Date(), 36)

    if (emailType === "VERIFY") {
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: date
        },
      })
    }
    else if (emailType === "RESET") {
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: date
        },
      })
    }
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: 'yuvrajbist@gmail.com',
    //     pass: 'Rappers4life',
    //   },
    // });
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2357dc0b2ccbc6",
        pass: "c84c8f959516ff"
      }
    });

    const mailOptions = {
      from: 'yuvrajbist@gmail.com',
      to: email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    }


    const res = await transporter.sendMail(mailOptions)
    return res;

  } catch (error: any) {
    throw new Error(error.message);
  }

}

export default sendMail