import { useContext, useEffect } from "react";
import Post from "./Post";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import styled from "styled-components";

export default function PostList() {
  const { postList, setPostList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);

  const getPostList = async () => {
    const posts = await getList(userInfo.token);
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
    getPostList();
  }, []);

  return (
    <SPostList>
      <p>PostList</p>
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
