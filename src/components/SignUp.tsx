import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sign_up } from "../api/User";
import { ReceivedErrors } from "../types/Type";
import { Alert } from "react-bootstrap";
import {
  SBlackButton,
  SButtonRow,
  SCpatchaErrorMessage,
  SErrorMessage,
  SInput,
  SSignInCaptchaRow,
  SSignInFrame,
  SSignInInput,
  SSignInLabel,
  SSignInRow,
  SWhiteButton,
} from "../styles/style";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptcha } from "../hooks/useRecaptcha";
import { EndAnimationMethod, SubmitButton } from "./SubmitButton";

export default function SignUp() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userIdMessage, setUserIdMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pass, setPass] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerId, setRegisterId] = useState("");

  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const [captchaMessage, setCaptchaMessage] = useState("");

  // 送信アニメーション完了処理 (開始処理(startSubmitAnimation関数)はボタンのクリックと同時に実行されるようSubmitButtonコンポーネントで実装されている)
  // このrefをpropsで渡すことで、子コンポーネント(SubmitButton)の関数endSubmitAnimationを参照で取得する
  const endSubmitAnimationRef = useRef<EndAnimationMethod | null>(null);
  const finishSubmit = () => {
    setIsLoading(false);
    endSubmitAnimationRef.current?.endSubmitAnimation();
  };

  const onSignUpClick = async () => {
    setIsLoading(true);
    // 送信前に入力値のバリデーションを行う
    let isInvalid: boolean = false;
    setUserIdMessage("");
    setEmailMessage("");
    setPassMessage("");
    setCaptchaMessage("");
    if (userId === "") {
      setUserIdMessage("入力してください");
      isInvalid = true;
    }
    if (email === "") {
      setEmailMessage("入力してください");
      isInvalid = true;
    }
    if (pass === "") {
      setPassMessage("入力してください");
      isInvalid = true;
    }

    if (!captchaToken) {
      setCaptchaMessage("クリックしてください");
      isInvalid = true;
    }

    if (isInvalid) {
      finishSubmit();
      return;
    }

    // 登録情報を送信し、エラーメッセージを配列で受け取る。登録に成功したとき、受け取る配列は空。
    const ret: ReceivedErrors = await sign_up(
      userId,
      email,
      pass,
      captchaToken
    );
    console.log(ret.data);

    if (ret.data.includes("userId_duplicated")) {
      setUserIdMessage("このIDは既に使われています");
    }

    if (ret.data.includes("email_duplicated")) {
      setEmailMessage("このメールアドレスは登録されています");
    }

    if (ret.data.includes("No recipients defined")) {
      setEmailMessage("有効なメールアドレスを入力してください");
    }

    if (ret.data.includes("reCAPTCHA failed")) {
      setCaptchaMessage("reCAPTCHAに失敗しました。もう一度お試しください。");
      handleRecaptcha("");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }

    if (ret.data.length === 0) {
      setRegisterId(userId);
      finishSubmit();

      // 送信後、reCAPTCHAをリセット(登録成功時)
      recaptchaRef.current?.reset();
      return;
    }

    toast.error("メールの送信に失敗しました。時間を置いてやり直してください。");
    finishSubmit();
    // 送信後、reCAPTCHAをリセット(登録失敗時)
    recaptchaRef.current?.reset();
  };

  return (
    <>
      {registerId && (
        <Alert variant={"success"} id="alert">
          {registerId}
          を仮登録しました!登録したメールアドレスに届いたメールから本会員登録のリンクに進んでください。
        </Alert>
      )}
      <SSignInFrame>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="id">ID</label>
          </SSignInLabel>
          <SSignInInput>
            <SInput
              id="id"
              value={userId}
              type="text"
              onChange={(evt) => setUserId(evt.target.value)}
            />
          </SSignInInput>
          <SErrorMessage>{userIdMessage}</SErrorMessage>
        </SSignInRow>

        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="password">email</label>
          </SSignInLabel>
          <SSignInInput>
            <SInput
              id="email"
              value={email}
              type="text"
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </SSignInInput>
          <SErrorMessage>{emailMessage}</SErrorMessage>
        </SSignInRow>

        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="password">Password</label>
          </SSignInLabel>
          <SSignInInput>
            <SInput
              id="password"
              value={pass}
              type="text"
              onChange={(evt) => setPass(evt.target.value)}
            />
          </SSignInInput>
          <SErrorMessage>{passMessage}</SErrorMessage>
        </SSignInRow>

        <SSignInCaptchaRow>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            onChange={handleRecaptcha}
          />
          <SCpatchaErrorMessage>{captchaMessage}</SCpatchaErrorMessage>
        </SSignInCaptchaRow>

        <SButtonRow>
          <SubmitButton
            name="Register"
            onClickFunc={onSignUpClick}
            isLoading={isLoading}
            ref={endSubmitAnimationRef}
          ></SubmitButton>
          <SWhiteButton
            type="button"
            onClick={() => navigate("/")}
            disabled={isLoading}
          >
            Cancel
          </SWhiteButton>
        </SButtonRow>
      </SSignInFrame>
      <Toaster />
    </>
  );
}
