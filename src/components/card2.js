import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card2 = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected, cardSent, cardInfo, cardIndex }) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 1 && cardsRevealed === 1) {
      audioReveal.current.play();
      handleCardReveal();
    } else if (cardsViewed === 3 && cardsRevealed === 3) {
      audioReveal.current.play();
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
        ) : cardsViewed >= 2 && cardSelected !== 2 && !cardSent ? (
          "card2--viewed"
        ) : cardSelected === 2 && !cardSent ? (
          "card2--selected"
        ) : cardSelected === 2 && cardSent ? (
          "card2--sent top"
        ) : cardSent ? (
          "card2--sent"
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
          <h2 className="card-number">{cardInfo[1].number}</h2>
          <video className={cardIndex < 21 ? "video-wrapper-card" : "video-wrapper-card reverse"} controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source className="background-image" src={require('../assets/cards/card_' + cardInfo[0].id + '.mp4')} type="video/mp4"/>
          </video>
          <h2 className="card-name">{cardInfo[2].name}</h2>
        </div>
        }
        <div id="card-filter-2" className="card-filter"/>
      </div>
    </div>
  );
}

export default Card2
