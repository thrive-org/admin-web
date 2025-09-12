import { getCurrentUser } from "@/domains/auth/server/session";
import caseService from "../server/case.service";
import { HttpError } from "@/utils/httpError";
import { CaseStatus } from "../constants/case-status";
import { sendMail } from "@/lib/email";

function sendLinkToClaimant(email: string, link: string) {
  console.log(`Sending link to ${email}: ${link}`);

  sendMail({
    to: 'abdul.bari@',
    subject: "Ready for Appointment",
    html: `<p>Click <a href="${link}">here</a> to submit your availability</p>`,
  });
}

const readyForAppointment = async (caseId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw HttpError.unauthorized("User not found");
    }

    const caseItem = await caseService.getCaseById(caseId);

    const updatedItem = await caseService.updateStatus(
      caseId,
      CaseStatus.READY_TO_APPOINTMENT
    );

    const link = await caseService.generateSecureLink(updatedItem.id);

    sendLinkToClaimant(caseItem.referral.claimant.emailAddress, link);
  } catch (error) {
    throw HttpError.fromError(error, "Failed to ready for appointment");
  }
};

export default readyForAppointment;
