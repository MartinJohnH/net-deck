import React, {useState} from "react"
import Card1 from "./card1"
import Footer from "./footer"

const Deck = ({ dealCards, areCardsDealt }) => {
  const [isCardReveal1, setIsCardReveal1] = useState(false);
  const [isCard1Done, setIsCard1Done] = useState(false);

  function handleDealCardsButtonClick() {
    dealCards();
  }

  function handleCard1Click() {
    setIsCardReveal1(true);
  }

  return (
    <>
      <Card1 dealCards={handleDealCardsButtonClick} areCardsDealt={areCardsDealt} handleCard1Reveal={handleCard1Click} isCardReveal1={isCardReveal1} />
      <div className={areCardsDealt ? "card2" : undefined}>
      </div>
      <div className={areCardsDealt ? "card3" : undefined}>
      </div>
      <Footer areCardsDealt={areCardsDealt} isCardReveal1={isCardReveal1} />
    </>
  );
}

export default Deck
