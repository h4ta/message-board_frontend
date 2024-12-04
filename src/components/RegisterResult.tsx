import { Alert } from "react-bootstrap";
import { registerUser } from "../api/User";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegisterResult = async () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const registerId: string = queryParams.get("id")!;
  const [userName, setUserName] = useState("");

  const res = await registerUser(registerId);
  setUserName(res.getData?.data);

  return (
    <div>
      {userName ? (
        <div>
          <Alert variant={"success"}>
            {userName}
            の本登録が完了しました。以下のボタンをクリックし、ログインをお願いします。
          </Alert>
        </div>
      ) : (
        <Alert variant="warning">
          無効なリンクです。ユーザー登録が完了していない場合は初めからやり直してください。
        </Alert>
      )}
      <SLoginButton onClick={() => navigate("/")}>Login Page</SLoginButton>
    </div>
  );
};

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  margin: 5px;
`;
