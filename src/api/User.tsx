import axios from "axios";

export const getUser = async (user_id: number, token: string) => {
  const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  return res.data;
};
