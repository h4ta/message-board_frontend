// 複数のファイルで使用する、使用しそうなスタイルをこのstyle.tsに記述している

import styled from "styled-components";

export const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  width: 400px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
  margin: 0 auto;
  margin-top: 10%;
`;

export const SSignInRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const SButtonRow = styled.div`
  display: block;
  margin-top: 5px;
  margin-bottom: 4px;
`;

export const SSignInLabel = styled.span`
  width: auto;
  text-align: center;
  vertical-align: top;
  text-align: left;
`;

export const SInput = styled.input`
  width: 100%;
`;

export const SSignInInput = styled.span`
  width: auto;
  vertical-align: top;
`;

export const SBlackButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  margin: 5px;
`;

export const SWhiteButton = styled.button`
  background-color: #f0f0f0;
  color: #444444;
  padding: 4px 16px;
  border-radius: 8px;
  margin: 5px;
`;

export const SErrorMessage = styled.div`
  font-size: 12px;
  color: #ff7676;
`;

export const SCheckImg = styled.img`
  max-width: 50%;
  height: auto;
  // display: block;
  margin-bottom: 10px;
`;
