import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected, cardSent, cardInfo, cardIndex }) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 0 && cardsRevealed === 0) {
      audioReveal.current.play();
      handleCardReveal();
    } else if (cardsViewed === 3 && cardsRevealed === 3) {
      audioReveal.current.play();
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
        ) : cardSelected === 1 && !cardSent ? (
          "card1--selected"
        ) : cardSelected === 1 && cardSent ? (
          "card1--sent top"
        ) : cardSent ? (
          "card1--sent"
        ) : (
        "card1--viewed"
        )
      }
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
      <div className={areCardsDealt && cardsRevealed === 0 ? "card-selection" : ""}>
        <img className="back-face-card noselect" src={cardSVG} alt="second card backface"/>
        {cardsRevealed >= 1 &&
        <div className="card--front-face">
          <h2 className="card-number">{cardInfo[1].number}</h2>
          <video className={cardIndex < 21 ? "video-wrapper-card" : "video-wrapper-card reverse"} controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source src={require('../assets/cards/card_' + cardInfo[0].id + '.mp4')} type="video/mp4"/>
          </video>
          <h2 className="card-name">{cardInfo[2].name}</h2>
        </div>
        }
        <div id="card-filter-1" className="card-filter"/>
      </div>
    </div>
  );
}

export default Card
