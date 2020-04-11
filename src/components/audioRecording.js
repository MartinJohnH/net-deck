import React, { useEffect, useRef } from "react"

//import AudioRecorder from 'audio-recorder-polyfill'
//import Recorder from 'recorder-js';
import Recorder from './recorder';


const AudioRecording = () => {
  const audioSource = useRef(null);

  //const [rec, setRec] = useState(null);
  //const [gumStream, setGumStream] = useState(null);

  let rec;
  let gumStream;

  if(typeof window !== `undefined`){
    URL = window.URL || window.webkitURL;

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record

  }

  useEffect(() => {

  }, [])

  function startRecording() {
    let constraints = { audio: true, video:false }

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
      audioContext = new AudioContext();
      gumStream = stream;
      rec = new Recorder(audioContext.createMediaStreamSource(stream), {numChannels:1});
      //start the recording process
      rec.record()
      console.log("Recording started");

    }).catch(function(err) {
      //enable the record button if getUserMedia() fails
      console.log(err);
    });
  }

  function stopRecording() {
    console.log("Recording stop");
    //tell the recorder to stop the recording
    rec && rec.stop();
    //stop microphone access
    gumStream && gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink
    rec && rec.exportWAV(createDownloadLink);
  }

  function createDownloadLink(blob) {
    console.log("createDownloadLink");
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audioID');
    console.log(url);
    au.controls = true;
    au.src = url;

    const player = new Audio(url);
    player.play();
  }

  function playRecording() {
    document.getElementById("audioID").play();
  }

  return (
    <>
      <audio id="audioID" src="../assets/cards/card_0.mp4" controls={true} autoPlay={false} preload="auto"/>
      <button onClick={startRecording}>Record</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={playRecording}>Play</button>
    </>
  );
}


export default AudioRecording
