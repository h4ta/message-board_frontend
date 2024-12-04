import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sign_up } from "../api/User";
import { ReceivedErrors } from "../types/Type";
import { Alert } from "react-bootstrap";
import {
  SBlackButton,
  SButtonRow,
  SErrorMessage,
  SInput,
  SSignInFrame,
  SSignInInput,
  SSignInLabel,
  SSignInRow,
  SWhiteButton,
} from "../styles/style";
import toast, { Toaster } from "react-hot-toast";

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

  const onSignUpClick = async () => {
    setIsLoading(true);
    // 送信前に入力値のバリデーションを行う
    let isInvalid: boolean = false;
    setUserIdMessage("");
    setEmailMessage("");
    setPassMessage("");
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
    if (isInvalid) {
      setIsLoading(false);
      return;
    }

    // 登録情報を送信し、エラーメッセージを配列で受け取る。登録に成功したとき、受け取る配列は空。
    const ret: ReceivedErrors = await sign_up(userId, email, pass);
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

    if (ret.data.length === 0) {
      setRegisterId(userId);
      setIsLoading(false);
      return;
    }

    toast.error("メールの送信に失敗しました。時間を置いてやり直してください。");
    setIsLoading(false);
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

        <SButtonRow>
          <SBlackButton
            type="button"
            onClick={onSignUpClick}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Register"}
          </SBlackButton>
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
