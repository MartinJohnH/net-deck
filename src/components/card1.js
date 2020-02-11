import React, { useState } from "react"

const Card1 = ({ dealCards, areCardsDealt, isCardReveal1, handleCard1Reveal}) => {

  function handleDealCardsButtonClick() {
    dealCards();
  }

  function handleCard1Click() {
    handleCard1Reveal();
  }

  return (
    <div
      className={!areCardsDealt ? "card1" : !isCardReveal1 ? "card1 animate--dealing" : "card1 animate--dealing reveal"}
      onClick={areCardsDealt ? handleCard1Click : undefined}
    >
      {!areCardsDealt &&
        <div>
          <div className="button--deal-cards noselect" onClick={handleDealCardsButtonClick}>
            <span>deal cards</span>
          </div>
        </div>
      }
      {isCardReveal1 &&
        <div>
          <div className="card1-reveal">

          </div>
          <div className="card-filter"/>
        </div>
      }
    </div>
  );
}

export default Card1
