import React from "react"

const Title = ({ areCardsDealt }) => (
  <>
    {!areCardsDealt &&
      <div className="intro-title noselect">
        <div className="title-word n">
          <span className="abv-title">N</span>
          <span className="removed-title1">ew</span>
        </div>
        <div className="title-word e">
          <span className="abv-title">E</span>
          <span className="removed-title2">ra</span>
        </div>
        <div className="title-word t">
          <span className="abv-title">T</span>
          <span className="removed-title3">arot</span>
        </div>
        <div className="title-word deck">
          <span>Deck</span>
        </div>
      </div>
    }
  </>
)


export default Title
