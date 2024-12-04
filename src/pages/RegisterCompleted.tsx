import { useEffect, useState } from "react";
import { registerUser } from "../api/User";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
import { SBlackButton } from "../styles/style";

export default function RegisterCompleted() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const registerId: string = queryParams.get("id")!;
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let isSended = false;

  const register = async () => {
    const res = await registerUser(registerId);
    setUserName(res.getData?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isSended) {
      register();
      isSended = true;
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Alert variant="primary">少々お待ちください</Alert>
      ) : userName ? (
        <div>
          <Alert variant={"success"}>
            {userName}
            の本登録が完了しました。以下のボタンをクリックし、ログインをお願いします。
          </Alert>
          <SBlackButton onClick={() => navigate("/")}>Login Page</SBlackButton>
        </div>
      ) : (
        <div>
          <Alert variant="warning">
            無効なリンクです。ユーザー登録が完了していない場合は初めからやり直してください。
          </Alert>
          <SBlackButton onClick={() => navigate("/")}>Login Page</SBlackButton>
        </div>
      )}
    </>
  );
}
