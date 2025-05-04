import React from "react"
import styled from 'styled-components'
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Product from './Product'

const GridView = ({ products, loading }) => {
  return (
    <Wrapper>
      <div className="products-container">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="product-skeleton">
              <Skeleton height={175} width="100%" style={{ borderRadius: '8px' }} />
              <div className="info">
                <Skeleton height={20} width="60%" />
                <Skeleton height={15} width="40%" />
              </div>
            </div>
          ))
          : products.map((product) => {
            return <Product key={product.id} {...product} />
          })}
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView;
