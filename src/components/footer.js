import React, { useState } from "react"

const Footer = ({ areCardsDealt, cardsRevealed, cardsViewed, handleCardsViewed }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  function handleNextClick() {
    handleCardsViewed();
  }

  function handleControlClick() {
    setIsPlaying(!isPlaying);
  }

  return (
    <footer className="footer">
      {(
        areCardsDealt && cardsRevealed === 0) ? (
          <span className="instruction">tap first card to reveal</span>
      ) : (
        cardsRevealed !== cardsViewed &&
        <div className="card-UI">
          <span className={isPlaying ? "play" : "play recording"} onClick={handleControlClick}>

            <span className={isPlaying ? "record" : "recording"}/>
          </span>
          <span className="next noselect" onClick={handleNextClick}>next</span>
        </div>
      )}
    </footer>
  );
}

export default Footer
