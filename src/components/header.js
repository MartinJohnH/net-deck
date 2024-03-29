import PropTypes from "prop-types"
import React, { useRef } from "react"
import clickSoundUI from "../assets/sounds/click.mp3"
import { Link } from "gatsby"

const Header = ({ siteTitle, cardsRevealed, cardsViewed, cardSelected, showInfoPage, handleInfoPage, cardInfo1, cardInfo2, cardInfo3, cardIndex1, cardIndex2, cardIndex3}) => {
  const audioClick = useRef(null);

  function handleTitleClick() {
    audioClick.current.play();
  }

  function handleInfoClick() {
    audioClick.current.play();
    handleInfoPage();
  }
  return (
    <>
      <header className="header">
        <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="auto"/>
        <a href="/" onClick={handleTitleClick}>
          <h1 className="header--title">{siteTitle}</h1>
        </a>
        <div className="info-wrapper" onClick={handleInfoClick}>
          {(cardsRevealed !== cardsViewed || cardSelected !== 0) &&
            <span className="instruction">card info</span>
          }
          <div className="info-button noselect">
            {!showInfoPage ? (
              <span>i</span>
            ):(
              <span className="cancel"><span>x</span></span>
            )}
          </div>
        </div>
      </header>
    <div className={showInfoPage ? ((cardsRevealed !== cardsViewed && cardsRevealed <= 3) || cardSelected !== 0) ? "info-popup card-info": "info-popup" : ((cardsRevealed !== cardsViewed && cardsRevealed <= 3) || cardSelected !== 0) ? "info-popup card-info closed": "info-popup closed"}>
      <div className={showInfoPage ? "info_inner-wrapper" : "info_inner-wrapper closed"}>
        {(cardsRevealed !== cardsViewed && cardsRevealed === 1) ?
          <>
            <h1>{cardInfo1[1].number} - {cardInfo1[2].name}</h1>
            {cardIndex1 < 22 ?
              <p>{cardInfo1[3].upright}</p>
              :
              <p>{cardInfo1[4].reversed}</p>
            }
          </>
        : (cardsRevealed !== cardsViewed && cardsRevealed === 2) ?
          <>
            <h1>{cardInfo2[1].number} - {cardInfo2[2].name}</h1>
            {cardIndex2 < 22 ?
              <p>{cardInfo2[3].upright}</p>
              :
              <p>{cardInfo2[4].reversed}</p>
            }
          </>
        :(cardsRevealed !== cardsViewed && cardsRevealed === 3) ?
          <>
            <h1>{cardInfo3[1].number} - {cardInfo3[2].name}</h1>
            {cardIndex3 < 22 ?
              <p>{cardInfo3[3].upright}</p>
              :
              <p>{cardInfo3[4].reversed}</p>
            }
          </>
        :(cardSelected !== 0) ?
          <>
            {cardSelected === 1 ?
              <>
                <h1>{cardInfo1[1].number} - {cardInfo1[2].name}</h1>
                {cardIndex1 < 22 ?
                  <p>{cardInfo1[3].upright}</p>
                  :
                  <p>{cardInfo1[4].reversed}</p>
                }
              </>
            : cardSelected === 2 ?
              <>
                <h1>{cardInfo2[1].number} - {cardInfo2[2].name}</h1>
                {cardIndex2 < 22 ?
                  <p>{cardInfo2[3].upright}</p>
                  :
                  <p>{cardInfo2[4].reversed}</p>
                }
              </>
            : cardSelected === 3 &&
              <>
                <h1>{cardInfo3[1].number} - {cardInfo3[2].name}</h1>
                {cardIndex3 < 22 ?
                  <p>{cardInfo3[3].upright}</p>
                  :
                  <p>{cardInfo3[4].reversed}</p>
                }
              </>
            }
          </>
        :
          <>
            <h1>New Era Tarot Deck</h1>
            <p>
              The New Era Tarot Deck, or NET Deck is a realisation of a traditional tarot deck in a new digital format. Rather than simply bring the cards and explanations over to the screen, the focus of the NET Deck is to keep the traditional oral generative storytelling that is presented through cartomancy using the tarot deck alive. In keeping with the traditional format of drawing three cards, each presenting Past, Present and Future respectively, this new deck also translates the traditional cards and their meaning into a new digital format, and an accompanying story provided anonymously by other users is shared based one what they felt this card meant to them.
            </p>
            <p>
              Once all three cards and their meaning have been revealed you will be prompted to share what one of the cards meant to you. That story will then be added to the respective audio collection for that card. Over time a digital repertoire of stories will be created that encompasses a myriad of perspectives, lives and peoples,  which lends insight into not only what the card represents but also what it means to you.
            </p>
            <Link className="creators-links" to="/cards">View card collection</Link>
            <h3 className="info-subtitle">Created by</h3>
            <h2 className="creators">Martin-John Hearty</h2>
            <a className="creators-links" href="https://martinjohnhearty.com/" target="_blank" rel="noopener noreferrer">martinjohnhearty.com</a>
            <h2 className="creators">Jonathan Ganz</h2>
            <a className="creators-links" href=" https://hybrid.concordia.ca/J_GANZ/Portfolio/mainpage.html" target="_blank" rel="noopener noreferrer"> https://hybrid.concordia.ca/J_GANZ/Portfolio/mainpage.html</a>
          </>
        }
      </div>
    </div>
  </>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `NET Deck`,
}

export default Header
