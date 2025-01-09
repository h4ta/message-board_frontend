import { useRef, useState } from "react";
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
import { EndAnimationMethod, SubmitButton } from "../components/SubmitButton";

export default function ResetGuide() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const navigate = useNavigate();

  // 送信アニメーション完了処理 (開始処理(startSubmitAnimation関数)はボタンのクリックと同時に実行されるようSubmitButtonコンポーネントで実装されている)
  // このrefをpropsで渡すことで、子コンポーネント(SubmitButton)の関数endSubmitAnimationを参照で取得する
  const endSubmitAnimationRef = useRef<EndAnimationMethod | null>(null);
  const finishSubmit = () => {
    setIsLoading(false);
    endSubmitAnimationRef.current?.endSubmitAnimation();
  };

  const onSendMailClick = async () => {
    setIsLoading(true);
    setEmailMessage("");

    if (email === "") {
      finishSubmit();
      setEmailMessage("入力してください");
      return;
    }

    const ret = await sendPassResetMail(email);
    if (ret.error) {
      // 未登録メールアドレスを入力したときはこのエラーは表示されない。メール送信時に何らかのエラーが起こった時、このエラーを表示する
      toast.error("メール送信に失敗しました。やり直してください。");
      finishSubmit();
      return;
    }

    setIsSended(true);
    finishSubmit();
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
          <SubmitButton
            name="Send Main"
            onClickFunc={onSendMailClick}
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
