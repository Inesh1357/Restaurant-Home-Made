import {Component} from 'react'

import CartContext from '../../CartContext'
import './index.css'

class CategoryItem extends Component {
  state = {addButton: 0, quantity: 1}

  render() {
    const {addButton} = this.state
    const {categoryItem, decrement, increment} = this.props
    const {
      dishAvailability,
      dishName,
      dishImage,
      dishPrice,
      dishCurrency,
      dishCalories,
      dishDescription,
      addonCat,
      dishId,
      count,
    } = categoryItem
    const z = addonCat.length > 0
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            cartList,
          } = value
          const onClickAddToCart = () => {
            addCartItem({...categoryItem, quantity: addButton})
            this.setState({addButton: 0})
          }

          const addListPage = cartList.filter(
            eachItem => eachItem.dishId === dishId,
          )
          const onClickSub = () => {
            const {quantity} = this.state
            decrement(dishId)
            decrementCartItemQuantity(dishId)
            if (quantity > 1) {
              this.setState(prevState => ({
                addButton: prevState.addButton - 1,
              }))
            }
          }
          const onClickAdd = () => {
            increment(dishId)
            incrementCartItemQuantity(dishId)
            this.setState(prevState => ({
              addButton: prevState.addButton + 1,
            }))
          }
          let c
          addListPage.map(eachItem => {
            c = eachItem.quantity
            return eachItem
          })
          const cartValue = c > 0 ? c : count
          console.log('mnbvcxzasdfgh')
          return (
            <>
              <li className="li">
                <div className="kkl">
                  <h1 className="li-heading">{dishName}</h1>
                  <p className="li-price">
                    {dishCurrency} {dishPrice}
                  </p>
                  <p className="li-para">{dishDescription}</p>
                  {dishAvailability ? (
                    <>
                      <div className="bg-btn">
                        <button
                          className="oo-btn"
                          type="button"
                          onClick={onClickSub}
                        >
                          -
                        </button>
                        <p className="add-count">{cartValue}</p>
                        <button
                          className="oo-btn"
                          type="button"
                          onClick={onClickAdd}
                        >
                          +
                        </button>
                      </div>
                      {cartValue > 0 ? (
                        <button
                          type="button"
                          className="button add-to-cart-btn"
                          onClick={onClickAddToCart}
                        >
                          ADD TO CART
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <p className="calcries">Not available</p>
                  )}
                  {z && <p className="csk">Customizations available</p>}
                </div>
                <p className="calcries">{dishCalories} calcries</p>
                <img src={dishImage} alt={dishName} className="item-img" />
              </li>
              <hr />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CategoryItem
