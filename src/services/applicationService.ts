import { PrismaClient, Application } from '@prisma/client';

const prisma = new PrismaClient();

export const applicationService = {
  // Create a new application
  create: async (data: Omit<Application, 'id'>): Promise<Application> => {
    try {
      const application = await prisma.application.create({ data });
      return application;
    } catch (error: any) {
      // Handle Prisma-specific errors or general ones
      throw new Error(`Failed to create application: ${error.message || error}`);
    }
  },

  // Find an application by ID
  findById: async (id: number): Promise<Application | null> => {
    try {
      const application = await prisma.application.findUnique({
        where: { id },
      });
      if (!application) {
        throw new Error(`Application with ID ${id} not found.`);
      }
      return application;
    } catch (error: any) {
      throw new Error(`Failed to find application with ID ${id}: ${error.message || error}`);
    }
  },

  // Update an application by ID
  update: async (
    id: number,
    data: Partial<Omit<Application, 'id'>>
  ): Promise<Application> => {
    try {
      const updatedApplication = await prisma.application.update({
        where: { id },
        data,
      });
      return updatedApplication;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error(`Application with ID ${id} not found.`);
      }
      throw new Error(`Failed to update application with ID ${id}: ${error.message || error}`);
    }
  },

  // Delete an application by ID
  delete: async (id: number): Promise<void> => {
    try {
      await prisma.application.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error(`Application with ID ${id} not found.`);
      }
      throw new Error(`Failed to delete application with ID ${id}: ${error.message || error}`);
    }
  },
};
