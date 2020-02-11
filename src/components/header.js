import PropTypes from "prop-types"
import React ,{ useState } from "react"

const Header = ({ siteTitle }) => {
  const [showInfoPage, setShowInfoPage] = useState(false);

  function handleInfoClick() {
    setShowInfoPage(!showInfoPage);
  }

  return (
    <header className="header">
      <a href="/">
        <span className="header--title">{siteTitle}</span>
      </a>
      <div className="info-button noselect" onClick={handleInfoClick}>
        {!showInfoPage ? (
          <span>i</span>
        ):(
          <span className="cancel"><span>x</span></span>
        )}
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
