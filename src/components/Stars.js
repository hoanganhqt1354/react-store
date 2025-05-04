import React from "react"
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Star = ({ stars, reviews }) => {
  const rating = Math.floor(stars)
  const decimal = stars - rating
  const starArray = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {index < rating ? (
          <BsStarFill />
        ) : index === rating && decimal > 0 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })
  return (
    <Wrapper>
      <div className='stars'>{starArray}</div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Star;
