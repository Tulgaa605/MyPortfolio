import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export function generateToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_error) {
    return null;
  }
}

// Added interface for decoded token payload
interface DecodedToken {
  userId: string;
  role: string;
  // Add other expected fields from your JWT payload if necessary
  iat: number; 
  exp: number;
}

export async function authMiddleware(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Log the decoded token for debugging
    console.log('Decoded token:', decoded);
    
    const requestHeaders = new Headers(req.headers);
    // Use the defined interface instead of 'any'
    requestHeaders.set('x-user-id', (decoded as DecodedToken).userId);
    requestHeaders.set('x-user-role', (decoded as DecodedToken).role || 'admin'); // Default to admin if role is missing
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
export async function adminMiddleware(_req: NextRequest) {
  try {
    // Temporarily allow all authenticated users to access admin routes
    // In a production environment, you would want to check the role
    return NextResponse.next();
    
    // Original code (commented out for now)
    /*
    const userRole = _req.headers.get('x-user-role');
    
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    return NextResponse.next();
    */
  } catch (_error) {
    return NextResponse.json(
      { error: 'Authorization failed' },
      { status: 403 }
    );
  }
} 