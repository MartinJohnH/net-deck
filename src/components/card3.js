import React, { useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card3 = ({ areCardsDealt, handleCardReveal, cardsRevealed, cardsViewed, handleCardSelection, cardSelected, cardSent, cardInfo, cardIndex}) => {
  const audioReveal = useRef(null);

  function handleCardClick() {
    if(cardsViewed === 2 && cardsRevealed === 2) {
      audioReveal.current.play();
      handleCardReveal();
    }else if (cardsViewed === 3 && cardsRevealed === 3) {
      audioReveal.current.play();
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
        ) : cardsViewed >= 3 && cardSelected !== 3 && !cardSent ? (
          "card3--viewed"
        ) : cardSelected === 3 && !cardSent ? (
          "card3--selected"
        ) : cardSelected === 3 && cardSent ? (
          "card3--sent top"
        ) : cardSent ? (
          "card3--sent"
        ) : (
          "card3"
        )
      }
      id="card-id-3"
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <div className={areCardsDealt && cardsViewed === 2 && cardsRevealed !== 3 ? "card-selection2" : undefined}>
        <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
        <img className="back-face-card noselect" src={cardSVG} alt="second card backface"/>
        {cardsRevealed >= 3 &&
        <div className="card--front-face">
          <h2 className="card-number">{cardInfo[1].number}</h2>
          <video className={cardIndex < 21 ? "video-wrapper-card" : "video-wrapper-card reverse"} controls={false} muted={true} autoPlay={true} loop={true}
                 playsInline={true} preload="auto">
            <source className="background-image" src={require('../assets/cards/card_' + cardInfo[0].id + '.mp4')} type="video/mp4"/>
          </video>
          <h2 className="card-name">{cardInfo[2].name}</h2>
        </div>
        }
        <div id="card-filter-3" className="card-filter"/>
      </div>
    </div>
  );
}

export default Card3
