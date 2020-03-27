import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card2 = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected }) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 1 && cardsRevealed === 1) {
      audioReveal.current.play();
      handleCardReveal();
    } else if (cardsViewed === 3 && cardsRevealed === 3) {
      handleCardSelection(2);
    }
  }

  return (
    <div
      className={
        !areCardsDealt ? (
          "no-card"
        ) : cardsRevealed === 2 && cardsViewed === 1 ? (
          "card2 reveal"
        ) : cardsViewed >= 2 && cardSelected !== 2 ? (
          "card2--viewed"
        ) : cardSelected === 2 ? (
          "card2--selected"
        ) : (
          "card2"
        )
      }
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <div className={areCardsDealt && cardsViewed === 1 && cardsRevealed !== 2 ? "card-selection2" : undefined}>
        <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
        <img className="back-face-card noselect" src={cardSVG} alt="second card backface"/>
        {cardsRevealed >= 2 &&
        <div className="card--front-face">
          <h2 className="card-number">VIII</h2>
          <video className="video-wrapper-card" controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source className="background-image" src={require("../assets/cards/card-test2.mp4")} type="video/mp4"/>
          </video>
          <h2 className="card-name">STRENGTH</h2>
        </div>
        }
        <div className="card-filter"/>
      </div>
    </div>
  );
}

export default Card2
