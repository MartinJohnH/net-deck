import React, { useEffect, useRef, useState } from "react"
import Footer from "./footer"
import cardInfo from './cardInfo';

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

  const audioStory1 = useRef(null);
  const audioStory2 = useRef(null);
  const audioStory3 = useRef(null);

  const [loadButton, setLoadButton] = useState(false);

  const [cardsRevealed, setCardRevealed] = useState(0);
  const [cardsViewed, setCardViewed] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [cardSent, setCardSent] = useState(false);
  const [showInfoPage, setShowInfoPage] = useState(false);

  const [dataCard1, setDataCard1] = useState(0);
  const [dataCard2, setDataCard2] = useState(0);
  const [dataCard3, setDataCard3] = useState(0);

  const [storyRec1, setStoryRec1] = useState(null);
  const [storyRec2, setStoryRec2] = useState(null);
  const [storyRec3, setStoryRec3] = useState(null);

  const [cardSelectedNum, setCardSelectedNum] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);


  const [isLoaded, setIsLoaded] = useState(false);

  function getCardsFromApi() {
    fetch("https://www.netdeck.app/api/stories")
      .then((response) => response.json())
      .then((json) => {
        setIsLoaded(true);
        setDataCard1(json.data[0].cardNum);
        setDataCard2(json.data[1].cardNum);
        setDataCard3(json.data[2].cardNum);
        setStoryRec1(json.data[0].storyRec);
        setStoryRec2(json.data[1].storyRec);
        setStoryRec3(json.data[2].storyRec);
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
    setIsAudioPlaying(true);
    setTimeout(function() {
      if (cardsRevealed === 0) {
        audioStory1.current.play();
      } else if (cardsRevealed === 1) {
        audioStory2.current.play();
      } else if (cardsRevealed === 2) {
        audioStory3.current.play();
      }
    }, 2500);
    //audioClick.current.play();
    setCardRevealed(cardsRevealed + 1);
  }

  function handleCardViewed() {
    setShowInfoPage(false);
    if(showInfoPage){
      setTimeout(function() {
        handleAudioReset(cardsViewed + 1);
        setCardViewed(cardsViewed + 1);
      }, 800);
    } else {
      handleAudioReset(cardsViewed + 1);
      setCardViewed(cardsViewed + 1);
    }
  }

  function handleInfoPage() {
    setShowInfoPage(!showInfoPage);
  }

  function handleCardSelection(cardNumber) {
    audioClick.current.play();
    setCardSelected(cardNumber);
    if (cardNumber === 1) {
      setCardSelectedNum(dataCard1);
    } else if (cardNumber === 2) {
      setCardSelectedNum(dataCard2);
    } else if (cardNumber === 3) {
      setCardSelectedNum(dataCard3);
    }
  }

  function finishedRecording() {
    setShowInfoPage(false);
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

  function handlePauseAndPlayButton(isPlaying) {
    if (cardsRevealed === 1) {
      if (isPlaying) {
        audioStory1.current.play();
        setIsAudioPlaying(true);
      }
      if (isAudioPlaying){
        audioStory1.current.pause();
        setIsAudioPlaying(false);
      }
    } else if (cardsRevealed === 2) {
      if (isPlaying) {
        audioStory2.current.play();
        setIsAudioPlaying(true);
      }
      if (isAudioPlaying) {
        audioStory2.current.pause();
        setIsAudioPlaying(false);
      }
    } else if (cardsRevealed === 3) {
      if (isPlaying) {
        audioStory3.current.play();
        setIsAudioPlaying(true);
      }
      if (isAudioPlaying) {
        audioStory3.current.pause();
        setIsAudioPlaying(false);
      }
    }
  }

  function handleAudioReset(cardNumber) {
    setIsAudioPlaying(false);
    if (cardNumber === 1) {
      audioStory1.current.pause();
      audioStory1.current.currentTime = 0;
    } else if (cardNumber === 2) {
      audioStory2.current.pause();
      audioStory2.current.currentTime = 0;
    } else if (cardNumber === 3) {
      audioStory3.current.pause();
      audioStory3.current.currentTime = 0;
    }
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
      <audio ref={audioStory1} src={storyRec1} controls={false} onEnded={() => handleAudioReset(1)} autoPlay={false} preload="auto"/>
      <audio ref={audioStory2} src={storyRec2} controls={false} onEnded={() => handleAudioReset(2)} autoPlay={false} preload="auto"/>
      <audio ref={audioStory3} src={storyRec3} controls={false} onEnded={() => handleAudioReset(3)} autoPlay={false} preload="auto"/>

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
        cardSelectedNum={cardSelectedNum}
        handlePauseAndPlayButton={handlePauseAndPlayButton}
        isAudioPlaying={isAudioPlaying}
      />
    </div>
    }
    </>
  );
}

export default Deck
