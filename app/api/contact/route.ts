import { sendContactEmail } from "lib/emails/send-contact";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return Response.json({ message: "Missing Fields" }, { status: 400 });
  }

  await sendContactEmail({
    name,
    email,
    subject,
    message
  });

  return Response.json({ message: "Message sended" });
}
