import { useContext } from "react";
import Layout from "../components/Layout";
import { PostListProvider } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { userInfo } from "os";
import { Navigate } from "react-router-dom";

export default function Main() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";

  console.log(loggedIn);

  return (
    <PostListProvider>
      {loggedIn ? <Layout /> : <Navigate replace to="/" />}
    </PostListProvider>
  );
}
