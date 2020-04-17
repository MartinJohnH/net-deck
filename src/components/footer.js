import React, { useRef, useState } from "react"
import clickSoundUI from "../assets/sounds/click.mp3"
import clickRecord from "../assets/sounds/start-beep.mp3"
import clickEndRecord from "../assets/sounds/end-beep.mp3"
import rerecordButton from "../assets/rerecord-button.svg"
import AudioWave from "./audioWave"

import AudioRecorder from "audio-recorder-polyfill"

let blob = [];
let rec;

const Footer = ({ areCardsDealt, cardsRevealed, cardsViewed, handleCardViewed, cardSelected, finishedRecording, cardSelectedNum, handlePauseAndPlayButton, isAudioPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(0);
  const [microphoneAccess, setMicrophoneAccess] = useState(false);

  const newSoundRecording = new Audio();

  const audioClick = useRef(null);
  const audioRecord = useRef(null);
  const audioEndRecord = useRef(null);

  const [recordingTimer, setRecordingTimer] = useState(null);
  const [isAudioPlayBack, setIsAudioPlayBack] = useState(true);

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
    blob = [];
    navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
      rec = new MediaRecorder(stream)
      rec.addEventListener('dataavailable', e => {
        blob = e.data;
      });
      audioRecord.current.play();
      rec.addEventListener('start', function() {
        console.log("start recording");
        setMicrophoneAccess(true);
        recordingState();
        setRecordingTimer(setTimeout(function() {
          recordedState();
          setIsRecording(2);
        }, 30000));
      });
      rec.addEventListener('stop', function() {
        setIsAudioPlayBack(true);
        setMicrophoneAccess(false);
        const audioUrl = URL.createObjectURL(blob);
        //const player = new Audio(audioUrl);
        newSoundRecording.src = audioUrl;
        newSoundRecording.play();
        newSoundRecording.onended = function() {
          setIsAudioPlayBack(false);
        };
      });
      rec.start();

    }).catch(function(err) {
      console.log(err);
    });
  }


  function stopRecording() {
    console.log("stop recording");
    //tell the recorder to stop the recording
    rec && rec.stop();
    rec && rec.stream.getTracks().forEach(i => i.stop())
  }

  function sendRecording() {
    if (blob.length !== 0) {
      console.log("send recording");
      let filename = 'audio_recording_' + new Date().toISOString() + ".wav";
      let formData = new FormData();
      const blobDataInWavFormat = new Blob([blob], { type : 'audio/mpeg-3; codecs=0' });
      formData.append("soundBlob", blobDataInWavFormat, filename);
      formData.append("cardNum", cardSelectedNum);
      let request = new XMLHttpRequest();
      request.open('post','/api/upload');
      request.send(formData);
    }
  }

  function handleNextClick() {
    audioClick.current.play();
    setIsPlaying(true);
    handleCardViewed();
  }

  function handleControlClick() {
    audioClick.current.play();
    handlePauseAndPlayButton(isPlaying);
    //setIsPlaying(!isPlaying);
  }

  function recordingState() {
    document.body.style.backgroundColor = '#3E0000';
    if (cardSelected === 1) {
      document.getElementById("card-id-2").classList.add("hide");
      document.getElementById("card-id-3").classList.add("hide");
      document.getElementById("card-filter-1").style.backgroundColor = 'rgba(62,0,0,0.3)';
      document.getElementById("card-filter-1").classList.add("recording");
    } else if (cardSelected === 2) {
      document.getElementById("card-id-1").classList.add("hide");
      document.getElementById("card-id-3").classList.add("hide");
      document.getElementById("card-filter-2").style.backgroundColor = 'rgba(62,0,0,0.3)';
      document.getElementById("card-filter-2").classList.add("recording");
    } else if (cardSelected === 3) {
      document.getElementById("card-id-1").classList.add("hide");
      document.getElementById("card-id-2").classList.add("hide");
      document.getElementById("card-filter-3").style.backgroundColor = 'rgba(62,0,0,0.3)';
      document.getElementById("card-filter-3").classList.add("recording");
    }
  }

  function recordedState() {
    //audioEndRecord.current.play();
    document.body.style.backgroundColor = '#000000';
    if (cardSelected === 1) {
      document.getElementById("card-filter-1").style.backgroundColor = 'rgba(62,0,0,0)';
      document.getElementById("card-filter-1").classList.remove("recording");
    } else if (cardSelected === 2) {
      document.getElementById("card-filter-2").style.backgroundColor = 'rgba(62,0,0,0)';
      document.getElementById("card-filter-2").classList.remove("recording");
    } else if (cardSelected === 3) {
      document.getElementById("card-filter-3").style.backgroundColor = 'rgba(62,0,0,0)';
      document.getElementById("card-filter-3").classList.remove("recording");
    }
    stopRecording();
  }

  function handleRerecordClick() {
    clearTimeout(recordingTimer);
    setIsRecording(isRecording - 1);
    setIsPlaying(false);
    startRecording();
  }

  function handleRecordClick() {
    setIsPlaying(!isPlaying);
    if(isRecording === 2){
      sendRecording();
      setIsPlaying(true);
      setIsRecording(isRecording + 1);
      finishedRecording();
      setTimeout(function() {
        setIsRecording(0);
      }, 2100);
    } else {
      if(isRecording === 0) {
        newSoundRecording.play();
        setIsRecording(isRecording + 1);
        startRecording();
      } else if (isRecording === 1) {
        if (microphoneAccess) {
          window.clearTimeout(recordingTimer);
          setIsRecording(isRecording + 1);
          audioEndRecord.current.play();
          recordedState();
        }
      } else {
        audioClick.current.play();
      }
    }
  }

  return (
    <footer className="footer">
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="auto"/>
      <audio ref={audioRecord} src={clickRecord} controls={false} autoPlay={false} preload="auto"/>
      <audio ref={audioEndRecord} src={clickEndRecord} controls={false} autoPlay={false} preload="auto"/>
      {(
        areCardsDealt && cardsRevealed === 0) ? (
          <span className="instruction">tap first card to reveal</span>
      ) : cardsViewed === 3 && cardSelected === 0 ? (
        <span className="instruction">select card to record your story</span>
      ) : cardsRevealed !== cardsViewed ? (
        <div className="card-UI">
          <div className="playing_story">
            <span className={isAudioPlaying ? "play" : "play"} onClick={handleControlClick}>
              <span className={isAudioPlaying ? "" : "paused"}/>
            </span>
            <div className={isAudioPlaying ? "wave-on " : "wave-off"}>
              <AudioWave delay={true}/>
            </div>
          </div>
          <span className="next noselect" onClick={handleNextClick}>next</span>
        </div>
      ) : cardSelected !== 0 && (
        <div className="card-UI recording">
          {isRecording === 2 &&
            <div className="re-record-button">
              <div className="rerecord-wrapper" onClick={handleRerecordClick}>
                <img className="rerecord" src={rerecordButton} alt="rerecord button"/>
              </div>
              <div className={isAudioPlayBack ? "wave-on " : "wave-off"}>
                <AudioWave delay={false}/>
              </div>
              {!isAudioPlayBack &&
                <span className="re-record-text noselect" onClick={handleRerecordClick}>rerecord</span>
              }
            </div>
          }
          <div className="recording-buttons" onClick={handleRecordClick}>
            {isRecording <= 1 &&
            <span className={isRecording === 1  ? "play record-button-outline no-delay" : "play record-button-outline"}>
              <span className={!isPlaying && microphoneAccess ? "recording" : "record-button"}/>
            </span>
            }
            {isRecording === 0 ?
              <span className="next recording noselect">start recording</span>
            : isRecording === 1 && !microphoneAccess ?
              <span className="next recording noselect">requires microphone access</span>
            : isRecording === 1 && microphoneAccess ?
                <span className="next recording noselect">stop recording</span>
            : isRecording === 2 &&
              <span className="next recording2 noselect">done</span>
            }
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer
