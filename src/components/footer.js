import React, { useRef, useState } from "react"
import clickSoundUI from "../assets/sounds/click.mp3"
import clickRecord from "../assets/sounds/start-beep.mp3"
import clickEndRecord from "../assets/sounds/end-beep.mp3"
import rerecordButton from "../assets/rerecord-button.svg"
import AudioWave from "./audioWave"
import AudioRecording from "./audioRecording"

const Footer = ({ areCardsDealt, cardsRevealed, cardsViewed, handleCardViewed, cardSelected, finishedRecording }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(0);

  const audioClick = useRef(null);
  const audioRecord = useRef(null);
  const audioEndRecord = useRef(null);

  const [recordingTimer, setRecordingTimer] = useState(null);

  function handleNextClick() {
    audioClick.current.play();
    setIsPlaying(true);
    handleCardViewed();
  }

  function handleControlClick() {
    audioClick.current.play();
    setIsPlaying(!isPlaying);
  }

  function recordingState() {
    audioRecord.current.play();
    document.body.style.backgroundColor = '#3E0000';
    document.getElementById("card-filter-1").style.backgroundColor = 'rgba(62,0,0,0.3)';
    document.getElementById("card-filter-2").style.backgroundColor = 'rgba(62,0,0,0.3)';
    document.getElementById("card-filter-3").style.backgroundColor = 'rgba(62,0,0,0.3)';
    document.getElementById("card-filter-1").classList.add("recording");
    document.getElementById("card-filter-2").classList.add("recording");
    document.getElementById("card-filter-3").classList.add("recording");
  }

  function recordedState() {
    //audioEndRecord.current.play();
    document.body.style.backgroundColor = '#000000';
    document.getElementById("card-filter-1").style.backgroundColor = 'rgba(62,0,0,0)';
    document.getElementById("card-filter-2").style.backgroundColor = 'rgba(62,0,0,0)';
    document.getElementById("card-filter-3").style.backgroundColor = 'rgba(62,0,0,0)';
    document.getElementById("card-filter-1").classList.remove("recording");
    document.getElementById("card-filter-2").classList.remove("recording");
    document.getElementById("card-filter-3").classList.remove("recording");
  }

  function handleRerecordClick() {
    clearTimeout(recordingTimer);
    setIsRecording(isRecording - 1);
    setIsPlaying(false);
    recordingState();

    setRecordingTimer(setTimeout(function() {
      recordedState();
      setIsRecording(2);
    }, 30000));
  }

  function handleRecordClick() {
    setIsPlaying(!isPlaying);
    if(isRecording === 2){
      setIsPlaying(true);
      setIsRecording(isRecording + 1);
      finishedRecording();
      setTimeout(function() {
        setIsRecording(0);
      }, 2100);
    } else {
      if(isRecording === 0) {
        setIsRecording(isRecording + 1);
        recordingState();
        setRecordingTimer(setTimeout(function() {
          recordedState();
          setIsRecording(2);
        }, 30000));
      } else if (isRecording === 1) {
        window.clearTimeout(recordingTimer);
        setIsRecording(isRecording + 1);
        audioEndRecord.current.play();
        recordedState();
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
            <span className={isPlaying ? "play" : "play"} onClick={handleControlClick}>
              <span className={isPlaying ? "" : "paused"}/>
            </span>
            <div className={isPlaying ? "wave-on " : "wave-off"}>
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
              <AudioWave delay={false}/>
            </div>
          }
          <div className="recording-buttons" onClick={handleRecordClick}>
            {isRecording <= 1 &&
            <span className={isRecording === 1 ? "play record-button-outline no-delay" : "play record-button-outline"}>
              <span className={isPlaying ? "record-button" : "recording"}/>
            </span>
            }
            {isRecording === 0 ?
              <span className="next recording noselect">start recording</span>
            : isRecording === 1 ?
              <span className="next recording noselect">stop recording</span>
            : isRecording === 2 &&
              <span className="next recording2 noselect">done</span>
            }
          </div>
        </div>
      )}
      <AudioRecording />
    </footer>
  );
}

export default Footer
