import React from "react"

const Background = () => {
  return (
    <>
      <video className="video-wrapper" preload="none" controls={false} muted={true} autoPlay={true} loop={true} playsInline={true}>
        <source src={require("../assets/bg_animation-1.mp4")} type="video/mp4"/>
        <source src={require("../assets/bg_animation-1.webm")} type="video/webm"/>
      </video>
    </>
  );
}

export default Background
