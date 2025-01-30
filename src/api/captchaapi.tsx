import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { captchaToken } = req.body;

    // Verify the CAPTCHA token with Google
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LcYE8cqAAAAAB-8z1MdFeqFdceX3veu-aRQRKfe&response=${captchaToken}`,
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