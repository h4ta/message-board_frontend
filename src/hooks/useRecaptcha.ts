import { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const useRecaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleRecaptcha = useCallback((token: string | null) => {
    setCaptchaToken(token || "");
  }, []);

  useEffect(() => {
    // reCAPTCHAの時間切れを設定
    const refreshCaptcha = () => {
      if (recaptchaRef.current && captchaToken) {
        recaptchaRef.current.reset();
        setCaptchaToken("");
      }
    };

    let tokenRefreshTimeout: NodeJS.Timeout | null = null;

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000); // 110秒に設定
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [captchaToken]);

  return { captchaToken, setCaptchaToken, recaptchaRef, handleRecaptcha };
};
