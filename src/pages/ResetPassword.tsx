import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkTempUserExist, passReset } from "../api/User";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "react-bootstrap";
import {
  SBlackButton,
  SErrorMessage,
  SInput,
  SSignInFrame,
  SSignInInput,
  SSignInLabel,
  SSignInRow,
} from "../styles/style";
import { EndAnimationMethod, SubmitButton } from "../components/SubmitButton";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReseted, setIsReseted] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const uuid: string = queryParams.get("id")!;
  const [isValid, setIsValid] = useState(true);

  // 送信アニメーション完了処理 (開始処理(startSubmitAnimation関数)はボタンのクリックと同時に実行されるようSubmitButtonコンポーネントで実装されている)
  // このrefをpropsで渡すことで、子コンポーネント(SubmitButton)の関数endSubmitAnimationを参照で取得する
  const endSubmitAnimationRef = useRef<EndAnimationMethod | null>(null);
  const finishSubmit = () => {
    setIsLoading(false);
    endSubmitAnimationRef.current?.endSubmitAnimation();
  };

  const checkValidLink = async (checkId: string) => {
    const ret = await checkTempUserExist(checkId);

    if (ret.error) {
      setIsValid(false);
    }
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    if (!isSended) {
      checkValidLink(uuid);
      setIsSended(true);
    }
  }, []);

  const onPassResetClick = async () => {
    setIsLoading(true);
    setPassMessage("");

    if (password === "") {
      setPassMessage("入力してください");
      finishSubmit();
      return;
    }

    const ret = await passReset(uuid, password);

    if (ret.error) {
      toast.error("パスワードの再設定に失敗しました。やり直してください。");
      finishSubmit();
      return;
    }
    finishSubmit();
    setIsReseted(true);
  };

  return (
    <>
      {!isSended && isLoading ? (
        <Alert variant="primary">少々お待ちください</Alert>
      ) : isValid ? (
        isReseted ? (
          <SSignInFrame>
            <SSignInRow>パスワード再設定が完了しました。</SSignInRow>

            <SSignInRow>
              <SBlackButton type="button" onClick={() => navigate("/")}>
                Login Page
              </SBlackButton>
            </SSignInRow>
          </SSignInFrame>
        ) : (
          <SSignInFrame>
            <SSignInRow>新しいパスワードを入力してください。</SSignInRow>

            <SSignInRow>
              <SSignInLabel>
                <label htmlFor="password">password</label>
              </SSignInLabel>
              <SSignInInput>
                <SInput
                  id="password"
                  value={password}
                  type="text"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </SSignInInput>
              <SErrorMessage>{passMessage}</SErrorMessage>
            </SSignInRow>

            <SSignInRow>
              <SubmitButton
                name="Reset"
                onClickFunc={onPassResetClick}
                isLoading={isLoading}
                ref={endSubmitAnimationRef}
              ></SubmitButton>
            </SSignInRow>
          </SSignInFrame>
        )
      ) : (
        <div>
          <Alert variant="warning">
            無効なリンクです。パスワード再設定が完了していない場合は初めからやり直してください。
          </Alert>
          <SBlackButton onClick={() => navigate("/")}>Login Page</SBlackButton>
        </div>
      )}
      <Toaster />
    </>
  );
}
