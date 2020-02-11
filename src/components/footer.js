import React from "react"

const Footer = ({ areCardsDealt, isCardReveal1 }) => {
  return (
    <footer className="footer">
      {(areCardsDealt && !isCardReveal1) ? (
          <span className="instruction">tap first card to reveal</span>
      ) : (
        isCardReveal1 &&
        <div className="card-UI">
          <span className="play noselect"><span></span></span>
          <span className="next noselect">next</span>
        </div>
      )}
    </footer>
  );
}

export default Footer
