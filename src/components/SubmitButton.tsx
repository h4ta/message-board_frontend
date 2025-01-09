import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SBlackButton } from "../styles/style";

interface PropsType {
  name: string;
  onClickFunc: () => void;
  isLoading: boolean;
}

export interface EndAnimationMethod {
  endSubmitAnimation: () => void;
}

// refと子のメソッドのリンクのため、forwardRefが必要
export const SubmitButton = forwardRef((props: PropsType, ref) => {
  const { name, onClickFunc, isLoading } = props;

  // 送信ボタンのアニメーション用変数
  const [dotNum, setDotNum] = useState(0);

  // 以下、送信ボタンのアニメーション。0.5秒ごとに '.' の数が0~2個に変化する
  const intervalId = useRef<number | null>(null);

  const startSubmitAnimation = () => {
    intervalId.current = window.setInterval(
      () => setDotNum((dotNum) => (dotNum + 1) % 3),
      500
    );
  };

  // 親コンポーネントから受け取ったrefと関数endSubmitAnimationをリンクさせる
  useImperativeHandle(ref, () => ({
    endSubmitAnimation() {
      clearInterval(intervalId.current!);
      intervalId.current = null;
      setDotNum(0);
    },
  }));

  return (
    <SBlackButton
      type="button"
      onClick={() => {
        startSubmitAnimation();
        onClickFunc();
      }}
      disabled={isLoading}
    >
      {/* ここの処理で '.' の数を1~3個に変化させる */}
      {isLoading ? ".".repeat(dotNum + 1) : name}
    </SBlackButton>
  );
});
