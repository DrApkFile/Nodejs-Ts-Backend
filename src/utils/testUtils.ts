import jwt from 'jsonwebtoken';

type Payload = {
  role: 'admin' | 'user';
};

export const generateTestToken = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET || 'test_secret'; // Replace with actual secret
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};
