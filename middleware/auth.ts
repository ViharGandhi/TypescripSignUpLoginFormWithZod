import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY || 'YOUEFEFN';

// Define the AuthRequest interface
interface AuthRequest extends Request {
  user?: JwtPayload;
}

const authenticateJwt = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader; // Use the whole header if there's no "Bearer " prefix

    
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateJwt;