import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  try {
    // This is a one-time script to update all users to have admin role
    // In a production environment, you would want to protect this with proper authentication
    
    const users = await prisma.user.findMany();
    
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'admin' },
      });
    }
    
    return NextResponse.json({
      message: `Updated ${users.length} users to have admin role`,
    });
  } catch (error) {
    console.error('Error updating users:', error);
    return NextResponse.json(
      { error: 'Failed to update users' },
      { status: 500 }
    );
  }
} 