import mailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config/config";

export async function sendMail(to: string, subject: string, message: string) {

  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  try {
    const mail = await transport.sendMail({
      to: to,
      from: EMAIL,
      subject: subject,
      text: message,
    });
    return
  } catch (error) {
    console.log("Could not send the mail", error);
    return;
  }
}
