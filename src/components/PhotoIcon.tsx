import { ChangeEvent, CSSProperties, useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import {
  SBlackButton,
  SButtonRow,
  SCheckImg,
  SWhiteButton,
} from "../styles/style";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../lib/firebase";
import { changeProfPic } from "../api/User";

interface PropsType {
  size: number;
  src: string;
  altText?: string;
  imgStyle?: CSSProperties;
  imgWrapperStyle?: CSSProperties;
  isProfilePic?: boolean;
  name?: string;
  prevImgURL?: string;
  getChangedPicURL?: (value: string) => void;
}

export const PhotoIcon = (props: PropsType) => {
  const {
    size,
    src,
    altText,
    imgWrapperStyle,
    imgStyle,
    isProfilePic = false,
    name,
    prevImgURL,
    getChangedPicURL,
  } = props;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const tooltip = <Tooltip id="tooltip">プロフィール画像を変更する</Tooltip>;

  const defaultStyle = {
    objectFit: "cover",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size / 2}px`,
  } as CSSProperties;

  const profStyle = {
    objectFit: "cover",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size / 2}px`,
    cursor: "pointer",
  } as CSSProperties;

  // プロフィール画像として変更する画像ファイルを選択
  const handleImgSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const getFile = e.target.files![0];

    if (!getFile) {
      return;
    }

    reader.onloadend = async () => {
      toast(
        (t) => (
          <div>
            <SCheckImg src={window.URL.createObjectURL(getFile)} />
            <div>
              この画像にプロフィール画像を変更しますか？
              <SButtonRow>
                <SBlackButton
                  onClick={() => {
                    toast.dismiss(t.id);
                    uploadImg(getFile);
                  }}
                >
                  OK
                </SBlackButton>
                <SWhiteButton
                  onClick={() => {
                    toast.dismiss(t.id);
                  }}
                >
                  cancel
                </SWhiteButton>
              </SButtonRow>
            </div>
          </div>
        ),
        {
          duration: Infinity,
        }
      );
    };
    reader.readAsDataURL(getFile);
    e.target.value = ""; // 次回同じファイルを選んでもhandleImgSelectが発火するように
  };

  // 選択したファイルをfirebaseに保存
  const uploadImg = async (uploadFile: File) => {
    if (!uploadFile) {
      return;
    }

    // 変更前の画像が設定されている場合、その画像をfirebaseから削除
    if (prevImgURL) {
      const prevImgRef = ref(storage, prevImgURL);
      deleteObject(prevImgRef)
        .then(() => {
          console.log(`${prevImgRef} を削除しました`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const storageRef = ref(storage, `images/${uploadFile.name}`);
    await uploadBytes(storageRef, uploadFile)
      .then((snapshot) => {
        console.log("投稿成功");
      })
      .catch((error) => {
        console.log("投稿失敗");
        console.log(error);
        toast.error("プロフィール画像を変更できませんでした。");
      });

    // firebaseから投稿した画像のURLを取得し、userDBに反映
    const picURL = await getDownloadURL(storageRef);
    console.log(picURL);
    const ret = await changeProfPic(name!, picURL);
    if (ret.error) {
      toast.error("プロフィール画像を変更できませんでした。");
      return;
    }

    // 親コンポーネントであるSideBar.tsxの画像URLを変更
    getChangedPicURL!(picURL);
  };

  return (
    <div style={imgWrapperStyle ? imgWrapperStyle : undefined}>
      {isProfilePic ? (
        // SideBarの時
        <>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <img
              src={src}
              alt={altText ? altText : ""}
              style={imgStyle ? imgStyle : profStyle}
              // imgタグをクリックしてファイル選択のダイヤログが出るように
              onClick={() => {
                const inputFile = inputFileRef.current;
                if (!inputFile) return;
                inputFile.click();
              }}
            />
          </OverlayTrigger>
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            hidden // inputタグ自体は隠す
            onChange={handleImgSelect}
          />
          <Toaster />
        </>
      ) : (
        // Postの時
        <>
          <img
            src={src}
            alt={altText ? altText : ""}
            style={imgStyle ? imgStyle : defaultStyle}
          />
        </>
      )}
    </div>
  );
};
