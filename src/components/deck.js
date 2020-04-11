import React, { useEffect, useRef, useState } from "react"
import Footer from "./footer"
import cardInfo from './cardInfo';

import cardSVG from "../assets/back-card.svg"
import Card from "./card"
import Card2 from "./card2"
import Card3 from "./card3"

import clickSoundUI from "../assets/sounds/click.mp3"
import cardShuffle from "../assets/sounds/card-suffle.mp3"
import cardSwish from "../assets/sounds/wind.mp3"

import Header from "./header"


const Deck = ({ dealCards, areCardsDealt, reDealCards }) => {
  const audioClick = useRef(null);
  const audioShuffle = useRef(null);
  const audioSwish = useRef(null);

  const [loadButton, setLoadButton] = useState(false);

  const [cardsRevealed, setCardRevealed] = useState(0);
  const [cardsViewed, setCardViewed] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [cardSent, setCardSent] = useState(false);
  const [showInfoPage, setShowInfoPage] = useState(false);

  const [dataCard1, setDataCard1] = useState(0);
  const [dataCard2, setDataCard2] = useState(0);
  const [dataCard3, setDataCard3] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  function getCardsFromApi() {
    fetch("http://localhost:8080/api/stories")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        setIsLoaded(true);
        setDataCard1(json.data[0].cardNum);
        setDataCard2(json.data[1].cardNum);
        setDataCard3(json.data[2].cardNum);
      },
        (error) => {
          console.log(error);
          setIsLoaded(true);
        }
      )
  }

  function loadingButton() {
    setTimeout(function() {
      setLoadButton(true);
    }, 2800);
  }

  useEffect(() => {
    getCardsFromApi();
    loadingButton();
  }, [])

  function handleDealCardsButtonClick() {
    audioClick.current.play();

    setTimeout(function() {
      audioShuffle.current.play();
    }, 1450);

    dealCards();
  }

  function handleCardReveal() {
    audioClick.current.play();
    setCardRevealed(cardsRevealed + 1);
  }

  function handleCardViewed() {
    setCardViewed(cardsViewed + 1);
    setShowInfoPage(false);
  }

  function handleInfoPage() {
    setShowInfoPage(!showInfoPage);
  }

  function handleCardSelection(cardNumber) {
    audioClick.current.play();
    setCardSelected(cardNumber);
  }

  function finishedRecording() {
    audioSwish.current.play();
    setCardSent(true);
    setTimeout(function() {
      getCardsFromApi();
      setCardSent(true);
      setCardRevealed(0);
      setCardViewed(0);
      setCardSelected(0);
      setCardSent(0);
      setLoadButton(false)
      loadingButton();
      reDealCards();
    }, 2100);
  }

  return (
    <>
    {isLoaded &&
    <div className="cards-wrapper">
      <Header
        cardsViewed={cardsViewed}
        cardsRevealed={cardsRevealed}
        cardSelected={cardSelected}
        showInfoPage={showInfoPage}
        handleInfoPage={handleInfoPage}
        cardInfo1={cardInfo[dataCard1 % 22].info}
        cardInfo2={cardInfo[dataCard2 % 22].info}
        cardInfo3={cardInfo[dataCard3 % 22].info}
        cardIndex1={dataCard1}
        cardIndex2={dataCard2}
        cardIndex3={dataCard3}
      />
      <Card
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
        cardSent={cardSent}
        cardInfo={cardInfo[dataCard1 % 22].info}
        cardIndex={dataCard1}
      />
      {(loadButton && !areCardsDealt) &&
      <div className="button--deal-cards noselect" onClick={handleDealCardsButtonClick}>
        <span>deal cards</span>
      </div>
      }
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="none"/>
      <audio ref={audioShuffle} src={cardShuffle} controls={false} autoPlay={false} preload="auto"/>
      <audio ref={audioSwish} src={cardSwish} controls={false} autoPlay={false} preload="auto"/>
      <Card2
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
        cardSent={cardSent}
        cardInfo={cardInfo[dataCard2 % 22].info}
        cardIndex={dataCard2}
      />

      <Card3
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardSelection={handleCardSelection}
        cardSelected={cardSelected}
        cardSent={cardSent}
        cardInfo={cardInfo[dataCard3 % 22].info}
        cardIndex={dataCard3}
      />

      <Footer
        areCardsDealt={areCardsDealt}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardViewed={handleCardViewed}
        cardSelected={cardSelected}
        finishedRecording={finishedRecording}
      />
    </div>
    }
    </>
  );
}

export default Deck
