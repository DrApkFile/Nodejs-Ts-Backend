import request from 'supertest';
import app from '../app';
import { generateTestToken } from '../utils/testUtils';

describe('Application Endpoints', () => {
  const adminToken = generateTestToken({ role: 'admin' });
  const userToken = generateTestToken({ role: 'user' });

  it('should allow a user to create a new application', async () => {
    const res = await request(app)
      .post('/api/v1/application/create')
      .set('Authorization', `Bearer ${userToken}`) // Valid user token
      .send({ name: 'John Doe', email: 'john@example.com', position: 'Developer' });

    expect(res.statusCode).toBe(201); // Expect success
    expect(res.body).toHaveProperty('id'); // Verify ID in response
  });

  it('should allow a user to update their application', async () => {
    // You should create an application first and get its ID for this test.
    // For now, we'll assume the ID is 1 (you might want to adjust based on your test setup).
    const res = await request(app)
      .put('/api/v1/application/1/update')
      .set('Authorization', `Bearer ${userToken}`) // Valid user token
      .send({ position: 'Senior Developer' });

    expect(res.statusCode).toBe(200); // Expect success
    expect(res.body.position).toBe('Senior Developer'); // Verify update
  });

  it('should prevent a user from accessing restricted routes', async () => {
    const res = await request(app)
      .get('/api/v1/application/1/get')
      .set('Authorization', `Bearer ${userToken}`); // Invalid role for route

    expect(res.statusCode).toBe(403); // Forbidden
    expect(res.body.message).toBe('Forbidden: You do not have the required role');
  });

  it('should allow an admin to access restricted routes', async () => {
    const res = await request(app)
      .get('/api/v1/application/1/get')
      .set('Authorization', `Bearer ${adminToken}`); // Valid admin token

    expect(res.statusCode).toBe(200); // Success
    expect(res.body).toHaveProperty('id', 1); // Verify ID in response
  });

  it('should prevent a user from deleting an application', async () => {
    const res = await request(app)
      .delete('/api/v1/application/1/delete')
      .set('Authorization', `Bearer ${userToken}`); // Invalid role for delete

    expect(res.statusCode).toBe(403); // Forbidden
    expect(res.body.message).toBe('Forbidden: You do not have the required role');
  });

  it('should return 401 for unauthenticated requests', async () => {
    const res = await request(app).post('/api/v1/application/create'); // No token

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.message).toBe('Access Denied');
  });
});
