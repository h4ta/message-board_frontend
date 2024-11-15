import axios from "axios";

export const sign_in = async (user_id: string, pass: string) => {
  const url = `http://localhost:3000/auth?user_id=${user_id}&password=${pass}`;
  console.log(url);
  const res = await axios.get(url);
  console.log(res);

  return res.data;
};
