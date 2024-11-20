// express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any| JwtPayload; // or any specific type you expect for `user`
    }
  }
}
