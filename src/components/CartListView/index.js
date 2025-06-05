import CartItem from '../CartItem'
import CartContext from '../../CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list" data-testid="cart">
          {cartList.map(eachCartItem => (
            <CartItem
              key={eachCartItem.dishId}
              cartItemDetails={eachCartItem}
            />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
