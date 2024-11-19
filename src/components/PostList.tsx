import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import styled from "styled-components";

export default function PostList() {
  const { postList, setPostList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);
  const [startNum, setStartNum] = useState(0);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  const postDisplayNum = 10;

  const getPostList = async (start: number) => {
    const posts = await getList(userInfo.token, start, postDisplayNum);
    console.log(posts);

    let postList: Array<PostType> = [];
    if (posts) {
      posts.forEach((p: PostType) => {
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }

    setPostList(postList);
  };

  useEffect(() => {
    getPostList(startNum);
    if (startNum - postDisplayNum < 0) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }

    // useEffect内で直接非同期関数を呼び出せないので、非同期処理を含んだ関数を作成してからそれを実行する
    const nextPostListCheck = async () => {
      const nextPostList = await getList(
        userInfo.token,
        startNum + postDisplayNum,
        postDisplayNum
      );
      if (nextPostList.length === 0) {
        setNextDisable(true);
      } else {
        setNextDisable(false);
      }
    };
    nextPostListCheck();
  }, [startNum]);

  return (
    <SPostList>
      <p>PostList</p>
      <SPageLink
        disabled={prevDisable}
        onClick={() => {
          if (startNum - postDisplayNum >= 0) {
            setStartNum((n) => n - postDisplayNum);
          }
        }}
      >
        前のページ
      </SPageLink>
      <SPageLink
        disabled={nextDisable}
        onClick={() => {
          setStartNum((n) => n + postDisplayNum);
        }}
      >
        次のページ
      </SPageLink>
      {postList.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </SPostList>
  );
}

const SPostList = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`;

const SPageLink = styled.button`
  margin: 16px;
`;
