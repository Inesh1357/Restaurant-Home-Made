import {Component} from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../CartContext'
import './index.css'

class Header extends Component {
  state = {name: '', success: false}

  componentDidMount() {
    this.getRestaurant()
  }

  getRestaurant = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        name: data[0].restaurant_name,
        success: true,
      })
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  render() {
    const {name, success} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {foodList, cartList} = value
          console.log(foodList)
          return (
            <>
              {success ? (
                <div className="header-bg">
                  <h1 className="header-heading">{name}</h1>
                  <div className="header-ins">
                    <p className="header-para">My Orders</p>

                    <ul className="nav-menu">
                      <li className="nav-menu-item">
                        <Link to="/" className="nav-link-kk">
                          Home
                        </Link>
                      </li>
                      <li className="nav-menu-item">
                        <Link to="/cart" className="nav-link">
                          <FiShoppingCart className="header-icon" />

                          <div className="cart-div">
                            <p className="cart-num">{cartList.length}</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="logout-desktop-btn"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)

/*
const {restaurantName, history} = props
  
  // const stroage = () => {
  //   localStorage.setItem('res_name', JSON.stringify(restaurantName))
  // }
  
*/
