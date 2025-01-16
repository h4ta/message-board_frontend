import React, { ReactNode, useContext, useEffect, useState } from "react";
import { PostListContext, PostType } from "../providers/PostListProvider";
import styled from "styled-components";
import { deletePost } from "../api/Post";
import { UserContext } from "../providers/UserProvider";
import { PhotoIcon } from "./PhotoIcon";
import { defaultPicURL } from "../lib/default";
import { getUserProfile } from "../api/User";
import { ImgLoader } from "./ImgLoader";

type Props = {
  post: PostType;
  getPostList: (startNum: number) => void;
};

export default function Post(props: Props) {
  const { post, getPostList } = props;
  const { userInfo } = useContext(UserContext);
  const { startNum } = useContext(PostListContext);
  const [userPicURL, setUserPicURL] = useState("");

  const getDateStr = (dateObj: Date) => {
    const year = post.created_at.getFullYear();
    const month = post.created_at.getMonth() + 1;
    const date = post.created_at.getDate();
    const hour = post.created_at.getHours();
    const min = post.created_at.getMinutes();
    const sec = post.created_at.getSeconds();

    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const getLines = (src: string): ReactNode => {
    return src.split("\n").map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });
  };

  // 各ポストの画像URLを取得
  useEffect(() => {
    const myGetUser = async () => {
      const userProf = await getUserProfile(post.user_name);
      if (userProf.getData?.data.profile_pic_url !== null) {
        console.log(userProf.getData?.data.profile_pic_url);

        setUserPicURL(userProf.getData?.data.profile_pic_url);
      } else {
        // プロフィール画像が登録されていない場合
        setUserPicURL(defaultPicURL);
      }
    };
    myGetUser();
  }, []);

  return (
    <SPost>
      <div>
        <div>
          {userPicURL !== "" ? (
            <PhotoIcon size={30} src={userPicURL}></PhotoIcon>
          ) : (
            <ImgLoader widthSize={30} heightSize={30} />
          )}
        </div>
        {/* ユーザーネームがDBにない場合、"削除されたユーザー"と表示 */}
        <SName>{post.user_name || "削除されたユーザー"}</SName>
        <SDate>{getDateStr(post.created_at)}</SDate>
      </div>
      <SContent>
        <div>{getLines(post.content)}</div>
        {post.user_id === userInfo.id && (
          <SDeleteButton
            onClick={async () => {
              await deletePost(userInfo.token, post.id);
              await getPostList(startNum);
            }}
          >
            削除
          </SDeleteButton>
        )}
      </SContent>
    </SPost>
  );
}

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #aaaaaa;
  text-align: left;
  padding-left: 8px;
`;

const SName = styled.span`
  margin-left: 3px;
  font-size: small;
  color: #000044;
`;

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`;

const SContent = styled.div`
  margin-left: 3px;
`;

const SDeleteButton = styled.button`
  width: 50px;
  height: 25px;
  font-size: 12px;
  background-color: #f0f0f0;
  color: #ff0000;
  border-radius: 8px;
  margin-bottom: 5px;
`;
