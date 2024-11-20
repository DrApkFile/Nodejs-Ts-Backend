import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateAndAuthorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      res.status(401).json({ message: 'Access Denied' }); // Deny access if token is missing
      return;
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET || 'test_secret') as JwtPayload;
      req.user = user; // Attach the decoded token (user object) to the request

      // Check if the user's role is authorized
      if (!roles.includes(user.role)) {
        res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        return;
      }

      next(); // Pass control if authenticated and authorized
    } catch (err) {
      res.status(403).json({ message: 'Invalid Token' }); // Handle invalid token
    }
  };
};
