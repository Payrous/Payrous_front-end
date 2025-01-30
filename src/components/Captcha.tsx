import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

interface CaptchaProps {
  onChange: (token: string | null) => void;
}


export default function Captcha({ onChange }: CaptchaProps) {
  const [token, setToken] = useState<string | null>(null);
  const siteID = process.env.NEXT_PUBLIC_SITE_ID;

  const handleCaptchaChange = (value: string | null) => {
    setToken(value);
    onChange(value);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        sitekey= siteID ?? ""
        onChange={handleCaptchaChange}
      />
      {token && <p className="text-green-500 mt-2">CAPTCHA verified!</p>}
    </div>
  );
}