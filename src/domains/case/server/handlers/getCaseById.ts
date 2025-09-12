import caseService from "../case.service";
import CaseDto from "../dto/case.dto";

const getCaseById = async (id: string, userId: string) => {
  const caseItem = await caseService.getCaseById(id);
  await caseService.doesCaseBelongToUser(caseItem, userId);
  return CaseDto.toCaseDetailDto(caseItem);
};

export default getCaseById;
