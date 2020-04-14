import React, { useEffect } from "react"
import cardInfo from '../components/cardInfo';

import SEO from "../components/seo"

const Cards = () => {
  useEffect(() => {
    document.body.classList.add("card_page");
    // returned function will be called on component unmount
    return () => {
      document.body.classList.remove("card_page");
    }
  }, [])
  return(
    <>
      <SEO title="cards" />
      <div className="text-wrapper">
        <h1>Card collection</h1>
        <p>3D modelled and animated by Jonathan Ganz</p>
      </div>
      <div className="card-spread">
        {cardInfo.map((card, index) =>
          <div key={"card" + index} className="card--front-face">
            <h2 className="card-number">{card.info[1].number}</h2>
            <video className="video-wrapper-card" controls={false}
                   muted={true} autoPlay={true} loop={true}
                   playsinline={true} preload="auto">
              <source src={require('../assets/cards/card_' + card.info[0].id + '.mp4')} type="video/mp4"/>
            </video>
            <h2 className="card-name">{card.info[2].name}</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards
