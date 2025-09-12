import caseService, { ListCasesFilter } from "../case.service";
import CaseDto from "../dto/case.dto";

const listCases = async (filter?: ListCasesFilter) => {
  const where = await caseService.convertFilterToWhere(filter);
  const cases = await caseService.listCases(where);

  return cases.map((c) => CaseDto.toCaseDto(c));
};

export default listCases;
