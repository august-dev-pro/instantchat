import React from "react";

const VideoMessage = ({ src }: { src: string }) => {
  return (
    <div className="video-message">
      <video controls width="100%">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoMessage;
