import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishName, dishImage, dishPrice, dishId, quantity} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onClickOnIncreses = () => {
        incrementCartItemQuantity(dishId)
      }
      const onClickOnDrecreses = () => {
        decrementCartItemQuantity(dishId)
      }
      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickOnDrecreses}
                data-testid="minus"
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickOnIncreses}
                data-testid="plus"
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dishPrice * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
