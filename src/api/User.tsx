import axios from "axios";
import { baseUrl } from "./baseUrl";
import { ReceivedErrors } from "../types/Type";

export const getUser = async (user_id: number, token: string) => {
  const url = baseUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  return res.data;
};

// ユーザーの公開情報(名前、アイコン画像URL)を取得 (認可は必要としない)
export const getUserProfile = async (userName: string) => {
  const url = baseUrl + `/user/profile/?name=${userName}`;
  console.log(url);

  try {
    const res = await axios.get(url);
    return { getData: res, error: null };
  } catch (error) {
    return { getData: null, error: error };
  }
};

export const sign_up = async (user_id: string, email: string, pass: string) => {
  const url = baseUrl + `/user`;
  console.log(url);
  const data = {
    name: user_id,
    email,
    password: pass,
  };

  const res: ReceivedErrors = await axios.post(url, data);
  return res;
};

export const registerUser = async (id: string) => {
  const url = baseUrl + `/user/?id=${id}`;

  try {
    const res = await axios.get(url);
    return { getData: res, error: null };
  } catch (error) {
    return { getData: null, error: error };
  }
};

export const sendPassResetMail = async (email: string) => {
  const url = baseUrl + `/user/reset`;

  try {
    const res = await axios.post(url, { email: email });
    return { getData: res, error: null };
  } catch (error) {
    return { getData: null, error: error };
  }
};

export const passReset = async (uuid: string, password: string) => {
  const url = baseUrl + `/user/reset/password/?id=${uuid}`;

  try {
    const res = await axios.post(url, { password: password });
    return { getData: res, error: null };
  } catch (error) {
    return { getData: null, error: error };
  }
};

export const checkTempUserExist = async (uuid: string) => {
  const url = baseUrl + `/user/tempUser/?id=${uuid}`;
  console.log(url);

  try {
    const res = await axios.get(url);
    return { getData: res, error: null };
  } catch (error) {
    console.log(error);
    return { getData: null, error: error };
  }
};

// DBに保存されているプロフィール画像のURLを変更
export const changeProfPic = async (name: string, newPicURL: string) => {
  const url = baseUrl + `/user/edit/picture/?name=${name}`;
  console.log(url);

  try {
    const res = await axios.post(url, { fileURL: newPicURL });
    return { getData: res, error: null };
  } catch (error) {
    console.log(error);
    return { getData: null, error: error };
  }
};
