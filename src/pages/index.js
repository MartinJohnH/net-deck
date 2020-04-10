import React, { useState } from "react"
import "../css/base/layout.css"

import SEO from "../components/seo"
import Header from "../components/header"
import Title from "../components/title"
import Deck from "../components/deck"
import Background from "../components/background"

const IndexPage = () => {
  const [areCardsDealt, setAreCardsDealt] = useState(false);

  function cardsDealt() {
    setAreCardsDealt(true);
  }

  function reDealCards() {
    setAreCardsDealt(false);
  }

  return (
    <div className="main-wrapper">
      <SEO />
      <Background />
      <Title areCardsDealt={areCardsDealt} />
      <Deck areCardsDealt={areCardsDealt} dealCards={cardsDealt} reDealCards={reDealCards} />
    </div>
  );
}

export default IndexPage
