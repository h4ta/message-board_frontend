import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sendPassResetMail } from "../api/User";
import toast, { Toaster } from "react-hot-toast";
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

export default function ResetGuide() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const navigate = useNavigate();

  const onSendMailClick = async () => {
    setIsLoading(true);
    setEmailMessage("");

    if (email === "") {
      setIsLoading(false);
      setEmailMessage("入力してください");
      return;
    }

    const ret = await sendPassResetMail(email);
    if (ret.error) {
      // 未登録メールアドレスを入力したときはこのエラーは表示されない。メール送信時に何らかのエラーが起こった時、このエラーを表示する
      toast.error("メール送信に失敗しました。やり直してください。");
      setIsLoading(false);
      return;
    }

    setIsSended(true);
    setIsLoading(false);
  };

  return (
    <>
      {isSended && (
        <Alert variant={"success"} id="br">
          パスワード再設定メールを送信しました！
          届いたメールからパスワード再設定のリンクに進んでください。
          {"\n"}
          届かない場合は入力したメールアドレスが間違っている、アカウントが登録されていない可能性があります。
        </Alert>
      )}
      <SSignInFrame>
        <SSignInRow id="br">
          登録したメールアドレスを入力してください。
          {"\n"}
          パスワード再設定メールを送信します。
        </SSignInRow>

        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="email">email</label>
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

        <SButtonRow>
          <SBlackButton
            type="button"
            disabled={isLoading}
            onClick={onSendMailClick}
          >
            {isLoading ? "..." : "Send Mail"}
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
