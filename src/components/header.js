import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="header">
    <h1 className="header--title">{siteTitle}</h1>
    <div className="info-button">
      <span>i</span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `NET Deck`,
}

export default Header
