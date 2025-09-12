import {
  Case,
  Organization,
  ExamFormat,
  RequestedSpecialty,
  CaseStatus,
  IMEReferral,
  CaseType,
  Claimant,
  Address,
  Account,
  User,
  Documents,
  CaseDocument,
} from "@prisma/client";

type CaseDetailWithRelations = Case & {
  referral: IMEReferral & {
    claimant: Claimant & {
      address?: Address | null;
    };
    organization?: Organization | null;
  };
  caseType: CaseType;
  examFormat: ExamFormat;
  requestedSpecialty: RequestedSpecialty;
  status: CaseStatus;
  assignTo?: (Account & {
    user?: (User & {
      profilePhoto?: Documents | null;
    }) | null;
  }) | null;
  documents: Array<
    CaseDocument & {
      document: Documents;
    }
  >;
};

type CaseWithRelations = Case & {
  status: CaseStatus;
  caseType: CaseType;
  examFormat: ExamFormat;
  requestedSpecialty: RequestedSpecialty;
  assignTo?:
    | (Account & {
        user: User;
      })
    | null;
  referral: IMEReferral & {
    claimant: Claimant;
    organization?: Organization | null;
  };
};

class CaseDto {
  static toCaseDto(c: CaseWithRelations) {
    return {
      id: c.id,
      referral: {
        id: c.referral.id,
        number: c.caseNumber,
      },
      claimant: {
        id: c.referral.claimant.id,
        name: c.referral.claimant.firstName + ' ' + c.referral.claimant.lastName,
        email: c.referral.claimant.emailAddress,
        phone: c.referral.claimant.phoneNumber,
        gender: c.referral.claimant.gender,
        dateOfBirth: c.referral.claimant.dateOfBirth,
      },
      organization: c.referral.organization ? {
        id: c.referral.organization?.id,
        name: c.referral.organization?.name,
        website: c.referral.organization?.website,
        status: c.referral.organization?.status,
      } : null,
      caseType: {
        id: c.caseType.id,
        name: c.caseType.name,
      },
      examFormat: {
        id: c.examFormat.id,
        name: c.examFormat.name,
      },
      requestedSpecialty: {
        id: c.requestedSpecialty.id,
        name: c.requestedSpecialty.name,
      },
      status: {
        id: c.status.id,
        name: c.status.name,
      },
      preferredLocation: c.preferredLocation,
      urgencyLevel: c.urgencyLevel,
      reason: c.reason,
      examinerId: c.examinerId,
      assignTo: c.assignTo ? {
        id: c.assignTo?.id,
        name: c.assignTo?.user.firstName + " " + c.assignTo?.user.lastName,
        email: c.assignTo?.user.email,
        phone: c.assignTo?.user.phone,
        gender: c.assignTo?.user.gender,
        dateOfBirth: c.assignTo?.user.dateOfBirth,
      } : null,
      assignedAt: c.assignedAt,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      deletedAt: c.deletedAt,
    };
  }

  static toCaseDetailDto(c: CaseDetailWithRelations) {
    return {
      id: c.id,
      referral: {
        id: c.referral.id,
        number: c.caseNumber,
      },
      claimant: {
        id: c.referral.claimant.id,
        firstName: c.referral.claimant.firstName,
        lastName: c.referral.claimant.lastName,
        email: c.referral.claimant.emailAddress,
        phone: c.referral.claimant.phoneNumber,
        gender: c.referral.claimant.gender,
        dateOfBirth: c.referral.claimant.dateOfBirth,
        address: c.referral.claimant.address ? {
          id: c.referral.claimant.address?.id,
          address: c.referral.claimant.address.address,
          street: c.referral.claimant.address.street,
          province: c.referral.claimant.address?.province,
          city: c.referral.claimant.address?.city,
          postalCode: c.referral.claimant.address?.postalCode,
        } : null,
      },
      caseType: {
        id: c.caseType.id,
        name: c.caseType.name,
      },
      organization: c.referral.organization ? {
        id: c.referral.organization?.id,
        name: c.referral.organization?.name,
        website: c.referral.organization?.website,
        status: c.referral.organization?.status,
      } : null,
      examFormat: {
        id: c.examFormat.id,
        name: c.examFormat.name,
      },
      requestedSpecialty: {
        id: c.requestedSpecialty.id,
        name: c.requestedSpecialty.name,
      },
      status: {
        id: c.status.id,
        name: c.status.name,
      },
      preferredLocation: c.preferredLocation,
      urgencyLevel: c.urgencyLevel,
      reason: c.reason,
      examinerId: c.examinerId,
      assignTo: c.assignTo && c.assignTo.user ? {
        id: c.assignTo?.id,
        name: c.assignTo?.user.firstName + " " + c.assignTo?.user.lastName,
        email: c.assignTo?.user.email,
        phone: c.assignTo?.user.phone,
        gender: c.assignTo?.user.gender,
        dateOfBirth: c.assignTo?.user.dateOfBirth,
        profileImage: c.assignTo?.user.profilePhoto?.name,
      } : null,
      documents: c.documents.map((d) => ({
        id: d.id,
        documentId: d.document.id,
        documentName: d.document.name,
        documentType: d.document.type,
        documentSize: d.document.size,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
      assignedAt: c.assignedAt,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      deletedAt: c.deletedAt,
    };
  }
}

export default CaseDto;
