import prisma from "@/lib/db";
import { HttpError } from "@/utils/httpError";

export class OrganizationsService {
  async listOrganizations() {
    try {
      return await prisma.organization.findMany({
        include: {
          type: true,
          address: true,
          manager: {
            include: {
              account: {
                include: {
                  user: true,
                },
              },
              department: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpError(500, "Failed to list organizations", { details: error });
    }
  }

  async getOrganizationById(id: string) {
    try {
      return await prisma.organization.findUnique({
        where: { id },
        include: {
          type: true,
          address: true,
          manager: {
            include: {
              account: {
                include: {
                  user: true,
                },
              },
              department: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpError(500, "Failed to get organization", { details: error });
    }
  }
}

const organizationsService = new OrganizationsService();
export default organizationsService;
