import React from "react"
import { Link } from "gatsby"
import "../css/base/layout.css"

import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Start Page" />
    <Link to="/cards/">Go to page 2</Link>
  </>
)

export default IndexPage
