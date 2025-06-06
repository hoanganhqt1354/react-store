import React, { useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { observer } from "mobx-react-lite";
import { productStore } from "../stores";
import { Link } from 'react-router-dom'

import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'

import { Helmet } from 'react-helmet'

const SingleProductPage = observer((props) => {

  const { id } = useParams()
  const navigate = useNavigate();

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product
  } = productStore

  useEffect(() => {
    productStore.fetchSingleProduct(id).then(() => {
      document.title = productStore.single_product.name.toUpperCase()
    }).catch((err) => {
      console.error(err)  // Handle error if needed
    })
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        navigate('/')
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

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
      {productStore.single_product?.name && (
        <Helmet>
          <title>{productStore.single_product.name}</title>
          <meta name="description" content={productStore.single_product.description} />
        </Helmet>
      )}

      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
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
            {stock > 0 && <AddToCart product={product} />}
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
