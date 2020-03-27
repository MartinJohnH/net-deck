import React, { useEffect, useRef, useState } from "react"
import Footer from "./footer"

import cardSVG from "../assets/back-card.svg"
import Card from "./card"
import Card2 from "./card2"
import Card3 from "./card3"

import clickSoundUI from "../assets/sounds/click.mp3"
import cardShuffle from "../assets/sounds/card-suffle.mp3"
import Header from "./header"


const Deck = ({ dealCards, areCardsDealt }) => {
  const audioClick = useRef(null);
  const audioShuffle = useRef(null);

  const [loadButton, setLoadButton] = useState(false);

  const [cardsRevealed, setCardRevealed] = useState(0);
  const [cardsViewed, setCardViewed] = useState(0);

  const [cardSelected, setCardSelected] = useState(0);

  // const [isCard1Placed, setIsCard1Placed] = useState(false);
 //  console.log(cardsRevealed + " : " + cardsViewed);


  useEffect(() => {
    setTimeout(function() {
      setLoadButton(true);
    }, 2800);
  }, [])

  function handleDealCardsButtonClick() {
    audioClick.current.play();

    setTimeout(function() {
      audioShuffle.current.play();
    }, 1450);

    dealCards();
  }

  function handleCardReveal() {
    setCardRevealed(cardsRevealed + 1);
  }

  function handleCardViewed() {
    setCardViewed(cardsViewed + 1);
  }

  function handleCardSelection(cardNumber) {
    audioClick.current.play();
    setCardSelected(cardNumber);
  }

  return (
    <div className="cards-wrapper">
      <Header
        cardsViewed={cardsViewed}
        cardsRevealed={cardsRevealed}
      />
      <Card
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
      />
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="none"/>
      <audio ref={audioShuffle} src={cardShuffle} controls={false} autoPlay={false} preload="auto"/>
      {(loadButton && !areCardsDealt) &&
        <div className="button--deal-cards noselect" onClick={handleDealCardsButtonClick}>
          <span>deal cards</span>
        </div>
      }
      <Card2
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
      />

      <Card3
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
      />

      <Footer
        areCardsDealt={areCardsDealt}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardViewed={handleCardViewed}
        cardSelected={cardSelected}
      />
    </div>
  );
}

export default Deck
