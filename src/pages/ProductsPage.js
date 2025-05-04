import React from "react"
import styled from 'styled-components'
import {
  PageHero,
  ProductList,
  Filters,
  Sort
 } from "../components";
import { Helmet } from 'react-helmet'

const ProductsPage = (props) => {
  return (
    <main>
      <Helmet>
        <title>Product List</title>
      </Helmet>

      <PageHero title="Products"/>
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage;

