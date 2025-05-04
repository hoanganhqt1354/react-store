import React from 'react'
import {
  Hero,
  FeaturedProducts,
  Services,
  Contact
} from '../components'

import { Helmet } from 'react-helmet'
const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Hero/>
      <FeaturedProducts/>
      <Services/>
      <Contact/>
    </main>
  )
}

export default HomePage
