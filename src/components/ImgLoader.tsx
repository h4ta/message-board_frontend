import ContentLoader from "react-content-loader";

interface PropsType {
  widthSize: number;
  heightSize: number;
}

export const ImgLoader = (props: PropsType) => {
  const { widthSize, heightSize } = props;

  const halfSize = `${widthSize / 2}`;

  return (
    <ContentLoader
      speed={2}
      width={widthSize}
      height={heightSize}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx={halfSize} cy={halfSize} r={halfSize} />
    </ContentLoader>
  );
};
