import React, {useState} from "react"
import Card1 from "./card1"
import Footer from "./footer"
import cardSVG from "../assets/back-card.svg"

const Deck = ({ dealCards, areCardsDealt }) => {
  const [cardsRevealed, setCardRevealed] = useState(0);
  const [cardsViewed, setCardViews] = useState(0);

  function handleDealCardsButtonClick() {
    dealCards();
  }

  function handleCardReveal() {
    setCardRevealed(cardsRevealed + 1);
  }

  function handleCardViewed() {
    setCardViews(cardsViewed + 1);
  }

  return (
    <div className="cards-wrapper">
      <Card1
        dealCards={handleDealCardsButtonClick}
        areCardsDealt={areCardsDealt}
        handleCardReveal={handleCardReveal}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
      />
      <div className={areCardsDealt ? "card2" : "no-card"}>
        <img className="back-face-card noselect" src={cardSVG}/>
      </div>
      <div className={areCardsDealt ? "card3" : "no-card"}>
        <img className="back-face-card noselect" src={cardSVG}/>
      </div>
      <Footer
        areCardsDealt={areCardsDealt}
        cardsRevealed={cardsRevealed}
        cardsViewed={cardsViewed}
        handleCardViewed={handleCardViewed}
      />
    </div>
  );
}

export default Deck
