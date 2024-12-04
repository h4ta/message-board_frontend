import { useContext, useState } from "react";
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

export default function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const onSignInClick = async () => {
    setIsLoading(true);
    const ret = await sign_in(userId, pass);
    console.log(ret);

    if (ret.error) {
      toast.error("ログインに失敗しました。IDまたはパスワードが不正です。");
      setIsLoading(false);
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
    setIsLoading(false);
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
          <SBlackButton
            type="button"
            onClick={onSignInClick}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Login"}
          </SBlackButton>
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
