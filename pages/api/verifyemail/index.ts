import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextRequest) {
  const body = await req.json()
  const { token } = body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: { gte: `${Date.now()}` }
      }
    });

    if (!user) {
      console.log("no User")
      return NextResponse.json({ error: "invalid token" }, { status: 400 })
    }

    console.log(user);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      }
    });

    return NextResponse.json({message:'success',success: true})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}