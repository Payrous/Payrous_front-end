import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { captchaToken } = req.body;
      
    const secretID = process.env.NEXT_PUBLIC_SECRET_ID;

    // Verify the CAPTCHA token with Google
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretID}&response=${captchaToken}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (data.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "CAPTCHA verification failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}