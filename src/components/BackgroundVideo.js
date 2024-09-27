import React from 'react';
import './BackgroundVideo.css';

function BackgroundVideo() {
  return (
    <div className="background-video">
      <video autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" style={{position:'center'}}/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default BackgroundVideo;
