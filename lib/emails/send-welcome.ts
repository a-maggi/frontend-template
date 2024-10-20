import { Resend } from "resend";
import { WelcomeEmail } from "components/emails/welcome";
import { config } from "../../config";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWelcomeEmail({
  name,
  email
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailTemplate = WelcomeEmail({ name });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: `${config.name} <${config.email}>`,
      to: email as string,
      subject: `Welcome to ${config.name}`,
      react: emailTemplate
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
