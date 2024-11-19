import axios from "axios";
import { baseUrl } from "./baseUrl";

export const getUser = async (user_id: number, token: string) => {
  const url = baseUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  return res.data;
};
