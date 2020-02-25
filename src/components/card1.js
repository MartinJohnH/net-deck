import React, { useState, useEffect, useRef } from "react"
import cardSVG from "../assets/back-card.svg"
import clickSoundUI from "../assets/sounds/click.mp3"
import cardShuffle from "../assets/sounds/card-suffle.mp3"
import cardReveal from "../assets/sounds/card-reveal.mp3"

const Card1 = ({ dealCards, areCardsDealt, cardsRevealed, handleCardReveal, cardsViewed}) => {
  const audioClick = useRef(null);
  const audioShuffle = useRef(null);
  const audioReveal = useRef(null);

  const [loadDealCardsButton, setLoadDealCardsButton] = useState(false);
  const [isCard1Placed, setIsCard1Placed] = useState(false);


  useEffect(() => {
    setTimeout(function() {
      setLoadDealCardsButton(true);
    }, 2800);
  }, [])

  function handleDealCardsButtonClick() {
    audioClick.current.play();

    setTimeout(function() {
      audioShuffle.current.play();
    }, 1450);

    setTimeout(function() {
      setIsCard1Placed(true);
    }, 2800);
    dealCards();
  }

  function handleCardClick() {
    if (isCard1Placed) {
      audioReveal.current.play();
      handleCardReveal();
    }
  }

  return (
    <div
      className={
        !areCardsDealt ?
          "card1"
        :
        cardsRevealed === 0 ?
          "card1 animate--dealing"
        :
        cardsViewed === 0 ?
          "card1 animate--dealing reveal"
        :
          "card1--viewed"
      }
      onClick={areCardsDealt ? handleCardClick : undefined}
    >
      <img className="back-face-card noselect" src={cardSVG} alt="card backface"/>
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="auto"/>
      <audio ref={audioShuffle} src={cardShuffle} controls={false} autoPlay={false} preload="auto"/>
      {(loadDealCardsButton && !areCardsDealt) &&
        <>
          <div className="button--deal-cards noselect" onClick={handleDealCardsButtonClick}>
            <span>deal cards</span>
          </div>
        </>
      }
      <audio ref={audioReveal} src={cardReveal} controls={false} autoPlay={false} preload="auto"/>
      {cardsRevealed !== 0 &&
        <>
          <div className="card1-reveal">
            <video className="video-wrapper-card" controls={false} muted={true} autoPlay={true} loop={true} playsInline={true} preload="auto">
              <source className="background-image" src={require("../assets/cards/card-test.mp4")} type="video/mp4"/>
            </video>
          </div>
          <div className="card-filter"/>
        </>
      }
    </div>
  );
}

export default Card1
