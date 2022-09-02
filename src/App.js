import { useRef, useState } from "react";
import CONSTANTS from './constants';
import styled from "styled-components";

import VideoOverlay from "./components/VideoOverlay";
import VideoControl from "./components/VideoControl";

const ContentWrapper = styled.div`
  width: 1200px;
  margin: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  display: block;
  width: 100%;
`;

const VideoWrapper = styled.div`
  position: relative;
`;

function App() {
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoRecorded, setIsVideoRecorded] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)
  const [recordedVideo, setRecordedVideo] = useState(null)

  const videoRef = useRef(null)
  const videoStream = useRef(null)
  const videoRecorder = useRef(null)

  const initMediaDevices = useRef(async () => {
    videoStream.current = await navigator.mediaDevices.getUserMedia(CONSTANTS.VIDEO_CONSTRAIN)
    const stream = videoStream.current

    const video = videoRef.current
    video.src = null
    video.srcObject = stream
    video.muted = true
    video.play()

    video.onpause = () => {
      video.controls = false;
      setIsOverlayVisible(true);
    };

    video.onended = () => {
      video.controls = false;
      setIsOverlayVisible(true);
    };

    const recorder = new MediaRecorder(stream, CONSTANTS.MEDIA_RECORDER_OPTIONS)
    videoRecorder.current = recorder
    const blobs = []

    recorder.ondataavailable = (chunk) => {
      if (chunk.data && chunk.data.size > 0) {
        blobs.push(chunk.data);
      }
    }

    recorder.onstop = () => {
      const videoBuffer = new Blob(blobs, { type: "video/webm" });
      const videoObject = URL.createObjectURL(videoBuffer);
      video.srcObject = null
      video.src = videoObject;
      setRecordedVideo(videoObject)
    }
  })

  const clearMediaDevices = useRef(() => {
    videoStream.current.getTracks().forEach(track => track.stop());
  })

  const setCameraRef = useRef((node) => {
    if (!node) {
      return
    }

    videoRef.current = node;
    initMediaDevices.current()
  })

  const handleStartRecording = useRef(() => {
    videoRecorder.current.start(1000)
    setIsRecording(true)
    setIsOverlayVisible(false)
  })

  const handleStopRecording = useRef(() => {
    videoRecorder.current.stop()
    clearMediaDevices.current()
    setIsRecording(false)
    setIsVideoRecorded(true)
    setIsOverlayVisible(true)
  })

  const handleRecordedVideoPlay = useRef(() => {
    const video = videoRef.current
    video.controls = true
    video.muted = false
    video.play()
    setIsOverlayVisible(false)
  })

  const handleResetVideo = useRef(() => {
    initMediaDevices.current()
    setIsRecording(false)
    setIsVideoRecorded(false)
  })

  return (
    <ContentWrapper>
      <VideoWrapper>
        <Video ref={setCameraRef.current} />

        {isOverlayVisible &&
          <VideoOverlay
            isVideoRecorded={isVideoRecorded}
            onRecordedVideoPlay={handleRecordedVideoPlay.current}
          />
        }

        <VideoControl
          isRecording={isRecording}
          isVideoRecorded={isVideoRecorded}
          onStartRecording={handleStartRecording.current}
          onStopRecording={handleStopRecording.current}
          onResetVideo={handleResetVideo.current}
          recordedVideo={recordedVideo}
        />
      </VideoWrapper>
    </ContentWrapper>
  );
}

export default App
