import axios from "axios";
import { baseUrl } from "./baseUrl";

export const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg,
  };

  const url = baseUrl + `/post?user_id=${user_id}&token=${token}`;
  console.log(`${user_id}, ${token}`);

  const res = await axios.post(url, data);
  console.log(res);
};

export const getList = async (token: string) => {
  const url = baseUrl + `/post?token=${token}&records=10`;
  const res = await axios.get(url);
  return res.data;
};
