import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { getList, post } from "../api/Post";
import { PostListContext, PostType } from "../providers/PostListProvider";
import styled from "styled-components";
import { PhotoIcon } from "./PhotoIcon";
import { defaultPicURL } from "../lib/default";
import { getUser, getUserProfile } from "../api/User";

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profPicURL, setProfPicURL] = useState("");
  const { userInfo } = useContext(UserContext);
  const { setPostList, setStartNum } = useContext(PostListContext);

  const getPostList = async () => {
    const posts = await getList(userInfo.token, 0, 10);
    console.log(posts);
    let postList: Array<PostType> = [];
    if (posts) {
      posts.forEach((p: PostType) => {
        postList.push({
          id: p.id,
          user_id: p.user_id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }

    setPostList(postList);
    setStartNum(0);
  };

  const onSendClick = async () => {
    await post(String(userInfo.id), userInfo.token, msg);
    await getPostList();
  };

  // 子コンポーネントであるPhotoIcon.tsxから、変更した画像のURLを取得するためのコールバック関数
  const getChangedPicURL = (newPicURL: string) => {
    setProfPicURL(newPicURL);
  };

  // ユーザーの名前、メールアドレス、プロフィール画像を取得
  useEffect(() => {
    const myGetUser = async () => {
      const user = await getUser(userInfo.id, userInfo.token);
      setName(user.name);
      setEmail(user.email);
      const userProf = await getUserProfile(user.name);
      console.log(userProf.getData?.data.profile_pic_url);
      if (userProf.getData?.data) {
        setProfPicURL(userProf.getData?.data.profile_pic_url);
        console.log(
          `URLをセットしました。${userProf.getData?.data.profile_pic_url}`
        );
      }
    };
    myGetUser();
  }, []);

  return (
    <>
      <SSideBar>
        <SSideBarRow>
          <PhotoIcon
            size={60}
            src={profPicURL || defaultPicURL}
            isProfilePic={true}
            name={name}
            prevImgURL={profPicURL}
            getChangedPicURL={getChangedPicURL}
          ></PhotoIcon>
          {name}
        </SSideBarRow>
        <SSideBarRow>{email}</SSideBarRow>
        <SSideBarRow>
          <SSideBarTextArea
            rows={4}
            value={msg}
            onChange={(evt) => setMsg(evt.target.value)}
          ></SSideBarTextArea>
        </SSideBarRow>
        <SSideBarRow>
          <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
        </SSideBarRow>
      </SSideBar>
    </>
  );
}

const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #cccccc;
  width: 97%;
`;

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
`;
