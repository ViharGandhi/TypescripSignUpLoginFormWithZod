import { Router, Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import authenticateJwt from '../middleware/auth';

interface AuthRequest extends Request {
    user?: JwtPayload;
  }
// Define the AuthRequest interface

const router: Router = Router();

// Use AuthRequest for the request parameter
router.get('/main', authenticateJwt as any, async(req: AuthRequest, res: Response) => {
    const user  = await req.user;
    res.send("User on the main page.")
});

export default router;