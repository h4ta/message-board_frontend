import { useContext, useRef, useState } from "react";
import { sign_in } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import toast, { Toaster } from "react-hot-toast";
import {
  SBlackButton,
  SButtonRow,
  SInput,
  SSignInFrame,
  SSignInInput,
  SSignInLabel,
  SSignInRow,
  SWhiteButton,
} from "../styles/style";
import { EndAnimationMethod, SubmitButton } from "./SubmitButton";

export default function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  // 送信アニメーション完了処理 (開始処理(startSubmitAnimation関数)はボタンのクリックと同時に実行されるようSubmitButtonコンポーネントで実装されている)
  // このrefをpropsで渡すことで、子コンポーネント(SubmitButton)の関数endSubmitAnimationを参照で取得する
  const endSubmitAnimationRef = useRef<EndAnimationMethod | null>(null);
  const finishSubmit = () => {
    setIsLoading(false);
    endSubmitAnimationRef.current?.endSubmitAnimation();
  };

  const onSignInClick = async () => {
    setIsLoading(true);
    const ret = await sign_in(userId, pass);
    console.log(ret);

    if (ret.error) {
      toast.error("ログインに失敗しました。IDまたはパスワードが不正です。");
      finishSubmit();
      return;
    }

    const info = ret.getData?.data;

    if (info && info.token) {
      setUserInfo({
        id: info.user_id,
        token: info.token,
      });
      navigate("/main");
    }
    finishSubmit();
  };

  return (
    <>
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
        </SSignInRow>

        <Link to="/reset">パスワードを忘れた場合</Link>

        <SButtonRow>
          <SubmitButton
            name="Login"
            onClickFunc={onSignInClick}
            isLoading={isLoading}
            ref={endSubmitAnimationRef}
          ></SubmitButton>
          <SWhiteButton
            type="button"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Sign up
          </SWhiteButton>
        </SButtonRow>
      </SSignInFrame>
      <Toaster />
    </>
  );
}
