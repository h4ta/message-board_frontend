import { createContext, Dispatch, SetStateAction, useState } from "react";

type UserInfo = {
  id: number;
  token: string;
};

export const UserContext = createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  }
);

export const UserProvider = (props: any) => {
  const { children } = props;

  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "" });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
