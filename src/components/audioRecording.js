import React from "react"

import AudioRecorder from "audio-recorder-polyfill"
//import Recorder from 'recorder-js';
//import Recorder from './recorder';


let rec;

const AudioRecording = () => {

  if(typeof window !== `undefined`) {
    window.MediaRecorder = AudioRecorder;

    if (MediaRecorder.notSupported) {
      console.log("not supported");
    }
  }

  if(typeof window !== `undefined`){
    URL = window.URL || window.webkitURL;
  }

  function startRecording() {
    let constraints = { audio: true, video:false }

    navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
      rec = new MediaRecorder(stream)
      rec.addEventListener('dataavailable', e => {
        document.getElementById("audioID").src = URL.createObjectURL(e.data);
        let url = URL.createObjectURL(e.data);
        console.log("url: " + url);
      })
      rec.start()

    }).catch(function(err) {
      console.log(err);
    });

    // navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    //   console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
    //   audioContext = new AudioContext();
    //   gumStream = stream;
    //   rec = new Recorder(audioContext.createMediaStreamSource(stream), {numChannels:1});
    //   //start the recording process
    //   rec.record()
    //   console.log("Recording started");
    //
    // }).catch(function(err) {
    //   //enable the record button if getUserMedia() fails
    //   console.log(err);
    // });
  }

  function stopRecording() {
    console.log("Recording stop");
    //tell the recorder to stop the recording
    rec && rec.stop();
    rec && rec.stream.getTracks().forEach(i => i.stop())
    //stop microphone access
    //gumStream && gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink
    //rec && rec.exportWAV(createDownloadLink);
  }

  // function createDownloadLink(blob) {
  //   console.log("createDownloadLink");
  //   let url = URL.createObjectURL(blob);
  //   let au = document.getElementById('audioID');
  //   console.log(url);
  //   au.controls = true;
  //   au.src = url;
  //
  //   const player = new Audio(url);
  //   player.play();
  // }

  function playRecording() {
    document.getElementById("audioID").play();
  }

  return (
    <>
      <audio id="audioID" src="" controls={true} autoPlay={false} preload="auto"/>
      <button onClick={startRecording}>Record</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={playRecording}>Play</button>
    </>
  );
}


export default AudioRecording
