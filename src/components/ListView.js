import React from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Link } from 'react-router-dom'
const ListView = ({ products, loading }) => {
  if (loading) {
    return (
      <Wrapper>
        {Array.from({ length: 3 }).map((_, idx) => (
          <article key={idx}>
            <Skeleton height={200} width={300} style={{ borderRadius: '8px', marginBottom: '1rem' }} />
            <div className="info">
              <Skeleton height={20} width="40%" />
              <Skeleton height={18} width="30%" style={{ margin: "0.5rem 0" }} />
              <Skeleton count={2} />
              <Skeleton height={30} width={80} style={{ marginTop: "1rem" }} />
            </div>
          </article>
        ))}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {products.map((product) => {
        const { id, name, price, image, description } = product
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div className="info">
              <h4>{name}</h4>
              <p className="price">${price}</p>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className='link btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }

  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }

  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
