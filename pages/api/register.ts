import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import mailer from '@/hooks/useMailer'

import prisma from '@/libs/prismadb';
import sendMail from '@/hooks/useMailer';
import { useEffect } from 'react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // useEffect(() => {
  //   sendMail({email:"yuvraj.219301002@muj.manipal.edu",emailType:"verify",userId:});
  // });

  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });

    // await sendMail({ email, emailType: "VERIFY", userId: user.id })

    return res.status(200).json(user);
  } catch (error) {
    console.log("lol nahi hua");
    return res.status(400).end();
  }
}