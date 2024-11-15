import { createContext, Dispatch, SetStateAction, useState } from "react";

export type PostType = {
  id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  {} as {
    postList: PostType[];
    setPostList: Dispatch<SetStateAction<PostType[]>>;
  }
);

export const PostListProvider = (props: any) => {
  const { children } = props;
  const [postList, setPostList] = useState<PostType[]>([]);

  return (
    <PostListContext.Provider value={{ postList, setPostList }}>
      {children}
    </PostListContext.Provider>
  );
};
