import { Request, Response } from 'express';
import { applicationService } from '../services/applicationService';

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.create(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.findById(Number(req.params.id));
    if (!data) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.update(Number(req.params.id), req.body);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    await applicationService.delete(Number(req.params.id));
    res.status(204).send(); // No content for successful deletion
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
