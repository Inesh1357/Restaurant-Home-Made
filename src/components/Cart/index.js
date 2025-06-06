import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      console.log(cartList)
      console.log('inbgebobou')
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      let priceAmount

      let amount = 0

      if (showEmptyView === false) {
        cartList.forEach(eachItem => {
          amount += eachItem.quantity * eachItem.dishPrice
        })

        priceAmount = amount
      }

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <div data-testid="cart">
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={onClickRemoveAll}
                  className="but"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="card-summary">
                  <h1 className="summary-heading">
                    Order Total:{' '}
                    <span className="span">Rs {priceAmount}/-</span>
                  </h1>
                  <p className="summary-para">
                    {cartList.length} Items in cart
                  </p>
                  <button type="button" className="summary-button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
