import { OrganizationDto } from "../dto/organizations.dto";
import organizationsService from "../organizations.service";

const getOrganizations = async (): Promise<any[]> => {
  const orgs = await organizationsService.listOrganizations();
  return orgs.map(OrganizationDto.toOrganization);
};

export default getOrganizations;
