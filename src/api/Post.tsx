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

export const getList = async (
  token: string,
  start: number,
  nr_records: number
) => {
  const url =
    baseUrl + `/post?token=${token}&start=${start}&records=${nr_records}`;
  const res = await axios.get(url);
  return res.data;
};

export const deletePost = async (token: string, id: number) => {
  const url = baseUrl + `/post?token=${token}&id=${id}`;
  const res = await axios.delete(url);
  console.log(res);
};
