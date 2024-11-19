import { createContext, Dispatch, SetStateAction, useState } from "react";

export type PostType = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  {} as {
    postList: PostType[];
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    startNum: number;
    setStartNum: Dispatch<SetStateAction<number>>;
  }
);

export const PostListProvider = (props: any) => {
  const { children } = props;
  const [postList, setPostList] = useState<PostType[]>([]);
  const [startNum, setStartNum] = useState(0);

  return (
    <PostListContext.Provider
      value={{ postList, setPostList, startNum, setStartNum }}
    >
      {children}
    </PostListContext.Provider>
  );
};
