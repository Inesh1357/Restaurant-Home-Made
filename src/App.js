import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import CartContext from './CartContext'
import Restaurant from './components/Restaurant'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {foodList: [], cartList: []}

  onIncrement = foodItem => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, foodItem],
    }))
  }

  onDecrement = id => {
    const {foodList} = this.state

    let countVal = 0
    const filterDataListAdd = foodList.map(eachItem => {
      if (countVal === 0 && eachItem.dishId === id) {
        countVal += 1
        return null
      }
      return eachItem
    })
    const dataFilterValue = filterDataListAdd.filter(
      eachItem => eachItem !== null,
    )

    this.setState({
      foodList: dataFilterValue,
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    console.log(product)
    console.log('ins')
    const {dishId} = product

    const productMatch = cartList.find(eachItem => eachItem.dishId === dishId)

    if (productMatch) {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.dishId === dishId) {
          return {...eachItem, quantity: eachItem.quantity}
        }

        return eachItem
      })

      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(eachItem => eachItem.dishId !== id)
    this.setState({cartList: filterCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartListData = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        return {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: cartListData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    let cartListDre = []
    cartListDre = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        const data = {...eachItem, quantity: eachItem.quantity - 1}
        return data
      }
      return eachItem
    })
    const filterDataList = cartListDre.filter(eachItem => eachItem.quantity > 0)
    this.setState({cartList: filterDataList})
  }

  render() {
    const {foodList, cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          foodList,
          cartList,
          onIncrement: this.onIncrement,
          onDecrement: this.onDecrement,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Restaurant} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
