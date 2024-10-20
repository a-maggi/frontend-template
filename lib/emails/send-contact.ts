import { Resend } from "resend";
import { FormContactEmail } from "components/emails/form-contact";
import { config } from "../../config";

const resend = new Resend(process.env.RESEND_API_KEY!);

export type Params = {
  name: string | null | undefined;
  email: string | null | undefined;
  subject: string;
  message: string | null | undefined;
};

export async function sendContactEmail(params: Params) {
  const emailTemplate = FormContactEmail(params);
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: `${config.name} <${config.email}>`,
      to: config.email,
      subject: params.subject,
      react: emailTemplate
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
