import React, { useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { observer } from "mobx-react-lite";
import { productStore } from "../stores";
import { Link } from 'react-router-dom'

import {
  Loading,
  Error,
  ProductImages,
  // AddToCart,
  Stars,
  PageHero,
} from '../components'

const SingleProductPage = observer((props) => {

  const { id } = useParams()
  const { single_product_loading: loading, single_product_error: error, single_product: product } = productStore

  useEffect(() => {
    productStore.fetchSingleProduct(id)
    console.log('fetchSingleProduct', id)
  }, [id]);

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>{stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>{sku}
            </p>
            <p className='info'>
              <span>Brand : </span>{company}
            </p>
            <Stars stars={stars} reviews={reviews} />
            {/* <AddToCart stock={stock} id={id} /> */}
          </section>
        </div>
      </div>
    </Wrapper>
  )
});

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage;
