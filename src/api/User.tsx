import axios from "axios";
import { baseUrl } from "./baseUrl";
import { ErrorMessages, ReceivedErrors } from "../types/Type";
import { error, log } from "console";

export const getUser = async (user_id: number, token: string) => {
  const url = baseUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  return res.data;
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
  // const res = await axios.post(url, data);
  // console.log(res);

  // return res.data;
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
