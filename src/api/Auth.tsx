import axios from "axios";
import { baseUrl } from "./baseUrl";

export const sign_in = async (user_id: string, pass: string) => {
  const url = baseUrl + `/auth?user_id=${user_id}&password=${pass}`;
  console.log(url);

  try {
    const res = await axios.get(url);
    console.log(res);
    return { getData: res, error: null };
  } catch (error) {
    return { getData: null, error: error };
  }
};
