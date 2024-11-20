import express from 'express';
import { authenticateAndAuthorize } from '../middleware/auth';
import {
  createApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController';

const router = express.Router();

// Route to create a new application
router.post('/create', authenticateAndAuthorize(['user']), createApplication);

// Route to get an application by ID (only accessible by admin)
router.get('/:id/get', authenticateAndAuthorize(['admin']), getApplicationById);

// Route to update an application by ID (accessible by user)
router.put('/:id/update', authenticateAndAuthorize(['user']), updateApplication);

// Route to delete an application by ID (only accessible by admin)
router.delete('/:id/delete', authenticateAndAuthorize(['admin']), deleteApplication);

export default router;
