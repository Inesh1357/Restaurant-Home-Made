import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import TabItem from '../TabItem'
import CategoryItem from '../CategoryItem'
import './index.css'

const apiStatusConstant = {
  initail: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Restaurant extends Component {
  state = {
    tabDetails: [],
    tabId: 0,
    categoryList: [],
    cart: [],
    apiStatus: apiStatusConstant.initail,
  }

  componentDidMount() {
    this.getRestaurant()
  }

  getRestaurant = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const upDate = data[0].table_menu_list
      const updateTabs = upDate.map(eachItem => ({
        categoryDishes: eachItem.category_dishes,
        menuCategory: eachItem.menu_category,
        menuCategoryId: eachItem.menu_category_id,
        menuCategoryImage: eachItem.menu_category_image,
      }))
      console.log(updateTabs)
      const updateItem = updateTabs[0].categoryDishes.map(eachItem => ({
        dishId: eachItem.dish_id,
        dishAvailability: eachItem.dish_Availability,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
        dishImage: eachItem.dish_image,
        dishCurrency: eachItem.dish_currency,
        dishCalories: eachItem.dish_calories,
        dishDescription: eachItem.dish_description,
        addonCat: eachItem.addonCat,
        count: 0,
        quantityAdd: 0,
      }))
      this.setState({
        tabDetails: updateTabs,
        tabId: updateTabs[0].menuCategoryId,
        categoryList: updateItem,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  changeTab = (id, categoryDishes) => {
    const updateItem = categoryDishes.map(eachItem => ({
      dishId: eachItem.dish_id,
      dishAvailability: eachItem.dish_Availability,
      dishName: eachItem.dish_name,
      dishPrice: eachItem.dish_price,
      dishImage: eachItem.dish_image,
      dishCurrency: eachItem.dish_currency,
      dishCalories: eachItem.dish_calories,
      dishDescription: eachItem.dish_description,
      addonCat: eachItem.addonCat,
      count: 0,
      quantityAdd: 0,
    }))

    this.setState({tabId: id, categoryList: updateItem})
  }

  decrement = id => {
    const {categoryList, cart} = this.state
    const productMatch = cart.find(eachItem => eachItem.dishId === id)
    const upadeCount = categoryList.map(eachItem => {
      if (eachItem.dishId === id) {
        if (eachItem.count > 0) {
          return {...eachItem, count: eachItem.count - 1}
        }
        return eachItem
      }
      return eachItem
    })
    let filterData
    if (productMatch) {
      filterData = cart.map(eachItem => {
        if (eachItem.dishId === id && eachItem.count > 0) {
          return {...eachItem, count: eachItem.count - 1}
        }
        return eachItem
      })
    } else {
      filterData = categoryList
    }
    this.setState({categoryList: upadeCount, cart: filterData})
  }

  increment = id => {
    const {categoryList, cart} = this.state
    const productMatch = cart.find(eachItem => eachItem.dishId === id)
    const upadeCount = categoryList.map(eachItem => {
      if (eachItem.dishId === id) {
        return {...eachItem, count: eachItem.count + 1}
      }
      return eachItem
    })
    let filterData
    if (productMatch) {
      filterData = cart.map(eachItem => {
        if (eachItem.dishId === id && eachItem.count > 0) {
          return {...eachItem, count: eachItem.count + 1}
        }
        return eachItem
      })
    } else {
      filterData = categoryList
    }
    this.setState({categoryList: upadeCount, cart: filterData})
  }

  renderSuccessView = () => {
    const {tabDetails, tabId, categoryList} = this.state
    return (
      <>
        <ul className="tab-list">
          {tabDetails.map(eachItem => (
            <TabItem
              tab={eachItem}
              key={eachItem.menuCategoryId}
              changeTab={this.changeTab}
              active={tabId === eachItem.menuCategoryId}
            />
          ))}
        </ul>
        <ul className="tab-item">
          {categoryList.map(eachItem => (
            <CategoryItem
              categoryItem={eachItem}
              key={eachItem.dish_id}
              increment={this.increment}
              decrement={this.decrement}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => {}

  renderIsLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader
        type="ThreeDots"
        color="#4f46e5"
        height={80}
        width={80}
        className="kkk"
      />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderIsLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <hr />
        {this.renderStatus()}
      </div>
    )
  }
}

export default Restaurant
