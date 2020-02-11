import React, { useState, useEffect} from "react"
import "../css/base/layout.css"

import SEO from "../components/seo"
import Header from "../components/header"
import Title from "../components/title"
import Deck from "../components/deck"

const IndexPage = () => {
  const [areCardsDealt, setAreCardsDealt] = useState(false);

  function dealCards() {
    setAreCardsDealt(true);
  }

  return (
    <div className="main-wrapper">
      <SEO />
      <Header />
      <video className="video-wrapper" controls={false} muted={true} autoPlay={true} loop={true} playsInline={true} >
        <source className="background-image" src={require("../assets/bg_animation-1.mp4")} type="video/mp4"/>
        <source className="background-image" src={require("../assets/bg_animation-1.webm")} type="video/webm"/>
      </video>
      <Title areCardsDealt={areCardsDealt} />
      <Deck areCardsDealt={areCardsDealt} dealCards={dealCards} />
    </div>
  );
}

export default IndexPage
