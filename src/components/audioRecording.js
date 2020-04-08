import React, { useRef, useState } from "react"

import AudioRecorder from 'audio-recorder-polyfill'
import cardReveal from "../assets/sounds/card-reveal.mp3"

const AudioRecording = () => {
  const audioSource = useRef(null);

  if(typeof window !== `undefined`){
    window.MediaRecorder = AudioRecorder;

    if (MediaRecorder.notSupported) {
      console.log("not supported");
    }
  }

  let recorder;

  function recording() {
    document.getElementById("audioID").src = "";
    //recorder = null;
    navigator.mediaDevices.getUserMedia({audio: true}).
    then((stream) => {
      recorder = new MediaRecorder(stream)
      recorder.addEventListener('dataavailable', e => {
        document.getElementById("audioID").src = URL.createObjectURL(e.data)
      })
      recorder.start()

    }).catch(function(err) {
      console.log(err);
    });
  }

  function stop() {
    console.log("recorder stopped");
    recorder.stop();
    recorder.stream.getTracks().forEach(i => i.stop())
  }
  function play() {
    document.getElementById("audioID").play();
  }

  return(
    <>
      <audio id="audioID" src={require("../assets/bg_animation-1.mp4")} controls={true} autoPlay={false} preload="auto"/>
      <button onClick={recording}>Record</button>
      <button onClick={stop}>Stop</button>
      <button onClick={play}>Play</button>
    </>
  );
}


export default AudioRecording
