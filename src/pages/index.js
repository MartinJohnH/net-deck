import React, { useState, useEffect } from "react"
import "../css/base/layout.css"

import SEO from "../components/seo"
import Header from "../components/header"
import Title from "../components/title"
import Deck from "../components/deck"
import Background from "../components/background"

const IndexPage = () => {
  const [areCardsDealt, setAreCardsDealt] = useState(false);

  function getCardsFromApi() {
    fetch("http://localhost:8080/api/stories/2")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function cardsDealt() {
    setAreCardsDealt(true);
  }

  function reDealCards() {
    setAreCardsDealt(false);
  }

  useEffect(() => {
    getCardsFromApi();
  });

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
