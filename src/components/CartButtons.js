import React, { useEffect } from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { userStore, productStore, cartStore } from '../stores'
import { observer } from 'mobx-react-lite'
import { useAuth0 } from '@auth0/auth0-react'

const CartButtons = observer((props) => {
  const { loginWithRedirect, logout } = useAuth0()
  const { myUser } = userStore
  const { total_items } = cartStore

  useEffect(() => {
    cartStore.countTotals()
  }, []);

  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={() => productStore.closeSidebar()}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      {myUser ? (
        <div className=''>
          <span>
            Hello, {myUser.name}
          </span>
          <button
            type='button'
            className='auth-btn'
            onClick={() => {
              // clearCart()
              localStorage.removeItem('user')
              logout({ logoutParams: { returnTo: window.location.origin } })
            }}
          >
            Logout <FaUserMinus />
          </button>
        </div>
      ) : (
        <button type='button' className='auth-btn' onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  )
});

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons;
