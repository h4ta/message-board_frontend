import React, { ReactNode, useContext } from "react";
import { PostListContext, PostType } from "../providers/PostListProvider";
import styled from "styled-components";
import { deletePost } from "../api/Post";
import { UserContext } from "../providers/UserProvider";

type Props = {
  post: PostType;
  getPostList: (startNum: number) => void;
};

export default function Post(props: Props) {
  const { post, getPostList } = props;
  const { userInfo } = useContext(UserContext);
  const { startNum } = useContext(PostListContext);

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

  return (
    <SPost>
      <div>
        <SName>{post.user_name}</SName>
        <SDate>{getDateStr(post.created_at)}</SDate>
      </div>
      <div>
        <div>{getLines(post.content)}</div>
        {post.user_id === userInfo.id && (
          <button
            onClick={async () => {
              await deletePost(userInfo.token, post.id);
              await getPostList(startNum);
            }}
          >
            削除
          </button>
        )}
      </div>
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
  font-size: small;
  color: #000044;
`;

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`;
