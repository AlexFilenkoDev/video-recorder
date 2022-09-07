import { memo } from "react"
import styled from "styled-components";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;


const PlayIcon = styled(PlayArrowIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #a7beff;
  font-size: 10rem !important;
  cursor: pointer;
`

function VideoOverlay({ onRecordedVideoPlay, isVideoRecorded }) {
  return (
    <Overlay>
      {isVideoRecorded && <PlayIcon onClick={onRecordedVideoPlay} />}
    </Overlay>
  );
}

export default memo(VideoOverlay)
