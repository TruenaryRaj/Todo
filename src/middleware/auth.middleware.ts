import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

export const authenticateToken = 
(req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
     res.sendStatus(401);
     return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) return res.sendStatus(403);

    req.user = user as any;
    next();  
    });
};
