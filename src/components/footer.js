import React, { useRef, useState } from "react"
import clickSoundUI from "../assets/sounds/click.mp3"

const Footer = ({ areCardsDealt, cardsRevealed, cardsViewed, handleCardViewed }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioClick = useRef(null);

  function handleNextClick() {
    audioClick.current.play();
    handleCardViewed();
  }

  function handleControlClick() {
    audioClick.current.play();
    setIsPlaying(!isPlaying);
  }

  return (
    <footer className="footer">
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="auto"/>
      {(
        areCardsDealt && cardsRevealed === 0) ? (
          <span className="instruction">tap first card to reveal</span>
      ) : (
        cardsRevealed !== cardsViewed &&
        <div className="card-UI">
          <span className={isPlaying ? "play" : "play"} onClick={handleControlClick}>

            <span className={isPlaying ? "" : "paused"}/>
          </span>
          <span className="next noselect" onClick={handleNextClick}>next</span>
        </div>
      )}
    </footer>
  );
}

export default Footer
