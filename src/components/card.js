import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected }) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 0 && cardsRevealed === 0) {
      audioReveal.current.play();
      handleCardReveal();
    } else if (cardsViewed === 3 && cardsRevealed === 3) {
      handleCardSelection(1);
    }
  }

  return (
    <div
      className={
        !areCardsDealt ? (
          "card1"
        ) : cardsRevealed === 0 ? (
          "card1 animate--dealing"
        ) : cardsViewed === 0 ? (
          "card1 animate--dealing reveal"
        ) : cardSelected === 1 ? (
          "card1--selected"
        ) : (
          "card1--viewed"
        )
      }
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <div className={areCardsDealt && cardsRevealed === 0 ? "card-selection" : undefined}>
        <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
        <img className="back-face-card noselect" src={cardSVG} alt="second card backface"/>
        {cardsRevealed >= 1 &&
        <div className="card--front-face">
          <h2 className="card-number">VI</h2>
          <video className="video-wrapper-card" controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source className="background-image" src={require("../assets/cards/card-test.mp4")} type="video/mp4"/>
          </video>
          <h2 className="card-name">THE&nbsp;LOVERS</h2>
        </div>
        }
        <div className="card-filter"/>
      </div>
    </div>
  );
}

export default Card
