import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card3 = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected }) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 2 && cardsRevealed === 2) {
      audioReveal.current.play();
      handleCardReveal();
    }else if (cardsViewed === 3 && cardsRevealed === 3) {
      handleCardSelection(3);
    }
  }

  return (
    <div
      className={
        !areCardsDealt ? (
          "no-card"
        ) : cardsRevealed === 3 && cardsViewed === 2 ? (
          "card3 reveal"
        ) : cardsViewed >= 3 && cardSelected !== 3 ? (
          "card3--viewed"
        ) : cardSelected === 3 ? (
          "card3--selected"
        ) : (
          "card3"
        )
      }
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <div className={areCardsDealt && cardsViewed === 2 && cardsRevealed !== 3 ? "card-selection2" : undefined}>
        <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
        <img className="back-face-card noselect" src={cardSVG} alt="second card backface"/>
        {cardsRevealed >= 3 &&
        <div className="card--front-face">
          <h2 className="card-number">V</h2>
          <video className="video-wrapper-card" controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source className="background-image" src={require("../assets/cards/card-test3.mp4")} type="video/mp4"/>
          </video>
          <h2 className="card-name">THE&nbsp;HIEROPHANT</h2>
        </div>
        }
        <div className="card-filter"/>
      </div>
    </div>
  );
}

export default Card3
