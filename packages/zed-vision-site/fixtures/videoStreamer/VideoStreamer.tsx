import * as React from "react";
import VideoStream from "videostream";
import WebTorrent from "webtorrent";

import styled from "@emotion/styled";

const Video: React.FC<{ file: any }> = ({ file }) => {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    new VideoStream(file, videoRef.current);
  });
  return (
    <React.Fragment>
      <h4>{file.name}</h4>
      <video
        style={{ width: "100%" }}
        ref={videoRef}
        autoPlay
        controls
        loop
        muted
        playsInline
      />
    </React.Fragment>
  );
};

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
`;

export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) => {
  const [state, changeState] = React.useState({
    loading: true,
    videoFiles: [],
    magnetURL: magnetURL,
  });

  React.useEffect(() => {
    const connect = async (magnetURL: string) => {
      const client = new WebTorrent();

      client.add(magnetURL, async function (torrent: any) {
        console.log(torrent.files);
        const videoFiles = torrent.files.filter((file: any) =>
          file.name.endsWith("mp4") || file.name.endsWith("mkv")
        );

        changeState({ ...state, loading: false, videoFiles: videoFiles });
      });
    };
    connect(magnetURL);
  }, []);

  if (state.loading) {
    return (
      <React.Fragment>
        <h2>loading</h2>
        <StyledTextArea
          value={magnetURL}
          onChange={(e) => changeState({ ...state, magnetURL: e.target.value })}
        />
      </React.Fragment>
    );
  }

  return (
    <div>
      {state.videoFiles.map((file: any, key) => (
        <Video file={file} key={key} />
      ))}
    </div>
  );
};
