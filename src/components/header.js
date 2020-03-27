import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import clickSoundUI from "../assets/sounds/click.mp3"

const Header = ({ siteTitle, cardsRevealed, cardsViewed}) => {
  const [showInfoPage, setShowInfoPage] = useState(false);
  const audioClick = useRef(null);

  function handleTitleClick() {
    audioClick.current.play();
  }

  function handleInfoClick() {
    audioClick.current.play();
    setShowInfoPage(!showInfoPage);
  }
  return (
    <header className="header">
      <audio ref={audioClick} src={clickSoundUI} controls={false} autoPlay={false} preload="auto"/>
      <a href="/" onClick={handleTitleClick}>
        <h1 className="header--title">{siteTitle}</h1>
      </a>
      <div className="info-wrapper">
        {cardsRevealed !== cardsViewed &&
          <span className="instruction">card info</span>
        }
        <div className="info-button noselect" onClick={handleInfoClick}>
          {!showInfoPage ? (
            <span>i</span>
          ):(
            <span className="cancel"><span>x</span></span>
          )}
        </div>
      </div>
      {showInfoPage &&
        <div className="info-popup">
          <div className="info_inner-wapper">
            <h1>New Era Tarot Deck</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
            <h2 className="info-subtitle">Created by</h2>
            <h3 className="creators">Martin-John Hearty</h3>
            <a className="creators-links" href="martinjohnhearty.com">martinjohnhearty.com</a>
            <h3 className="creators">Jonathan Ganz</h3>
            <a className="creators-links" href="jonathanganz.com">jonathanganz.com</a>
          </div>
        </div>
      }
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `NET DECK`,
}

export default Header
