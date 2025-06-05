import React from 'react'

const CartContext = React.createContext({
  foodList: [],
  onIncrement: () => {},
  onDecrement: () => {},
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
