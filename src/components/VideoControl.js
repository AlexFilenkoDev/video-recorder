import { memo } from "react"
import { Button } from "@mui/material"
import styled from "styled-components";

const VideoControlWrapper = styled.div`
  position: absolute !important;
  bottom: 5%;
  right: 5%;
`
const VideoControlButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 20px;
  }
`

function VideoControl({ isRecording, isVideoRecorded, onStartRecording, onStopRecording, onResetVideo, recordedVideo }) {
  if (isVideoRecorded) {
    return (
      <VideoControlWrapper>
        <VideoControlButton variant="contained" color="error" size="large" onClick={onResetVideo}>RESET RECORD</VideoControlButton>
        <VideoControlButton
          variant="contained"
          size="large"
          component="a"
          download={`${new Date().getTime()}.webm`}
          href={recordedVideo}
        >
          DOWNLOAD RECORD
        </VideoControlButton>
      </VideoControlWrapper>
    );
  }

  if (isRecording) {
    return (
      <VideoControlWrapper>
        <VideoControlButton variant="contained" size="large" onClick={onStopRecording}>STOP RECORDING</VideoControlButton>
      </VideoControlWrapper>
    );
  }

  return (
    <VideoControlWrapper>
      <VideoControlButton variant="contained" size="large" onClick={onStartRecording}>START RECORDING</VideoControlButton>
    </VideoControlWrapper>
  );
}

export default memo(VideoControl)
