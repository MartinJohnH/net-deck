import React from "react"
import { Link } from "gatsby"
import "../css/base/layout.css"

import SEO from "../components/seo"
import Header from "../components/header"
import Title from "../components/title"
import Deck from "../components/deck"

const IndexPage = () => (
  <div className="main-wrapper">
    <SEO />
    <Header />
    <Title />
    <Deck />
  </div>
)

export default IndexPage
