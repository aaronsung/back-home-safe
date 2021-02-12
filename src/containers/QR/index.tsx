import React from "react";
import { Link, useHistory } from "react-router-dom";
import Scanner from "react-webcam-qr-scanner";
import styled from "styled-components";
import back from "../../assets/back.svg";
import { qrDecode } from "../../utils/qrDecode";

type Props = {
  setPlace: (input: string) => void;
};

export const QR = ({ setPlace }: Props) => {
  const browserHistory = useHistory();

  const handleScan = ({ data }: { data: string }) => {
    if (!data) return;
    setPlace(qrDecode(data));
    browserHistory.push("/confirm");
  };

  return (
    <>
      <Header>
        <Link to="/">
          <BackButton src={back} />
        </Link>
        掃瞄二維碼
      </Header>
      <VideoContainer>
        <StyledScanner
          onDecode={handleScan}
          constraints={{
            audio: false,
            video: {
              facingMode: "environment",
            },
          }}
          captureSize={{ width: 1280, height: 720 }}
        />
      </VideoContainer>
    </>
  );
};

const BackButton = styled.img`
  height: 20px;
  top: 14px;
  left: 16px;
  position: absolute;
`;

const Header = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  color: #ffffff;
  background-color: #12b188;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledScanner = styled(Scanner)`
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
