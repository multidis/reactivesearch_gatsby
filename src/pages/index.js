import React from "react"
//import { Link } from "gatsby"
import SearchReactive from '../components/SearchReactive'

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Trying to make ReactiveSearch work with Gatsby based on the <a href="https://github.com/jonniebigodes/test_reactivesearch">original implementation</a>.</p>
    <SearchReactive />
  </Layout>
)

export default IndexPage
