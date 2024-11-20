// types.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace `any` with the actual type of `user`, e.g., `{ role: string; id: string; }`
    }
  }
}
