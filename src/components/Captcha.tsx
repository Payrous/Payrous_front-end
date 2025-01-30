import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

interface CaptchaProps {
  onChange: (token: string | null) => void;
}

export default function Captcha({ onChange }: CaptchaProps) {
  const [token, setToken] = useState<string | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setToken(value);
    onChange(value);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        sitekey="6LcYE8cqAAAAALNDc9CCbMjRox3-YIHP86-CvaLn"
        onChange={handleCaptchaChange}
      />
      {token && <p className="text-green-500 mt-2">CAPTCHA verified!</p>}
    </div>
  );
}