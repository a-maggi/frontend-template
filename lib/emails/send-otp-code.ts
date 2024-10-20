import { Resend } from "resend";
import OtpCodeEmail from "components/emails/otp-code";
import { config } from "../../config";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpCodeEmail(validationCode: number, email: string) {
  const emailTemplate = OtpCodeEmail({ validationCode });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: `${config.name} <${config.email}>`,
      to: email as string,
      subject: `Your OTP code is ${validationCode}`,
      react: emailTemplate
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
