import './index.css'

const TabItem = props => {
  const {tab, changeTab, active} = props
  const {menuCategory, menuCategoryId, categoryDishes} = tab
  const onClickTab = () => {
    changeTab(menuCategoryId, categoryDishes)
  }

  const a = active ? 'btnn' : 'btn'
  const b = active ? 'kk' : 'tab-name'

  return (
    <li className={b}>
      <button type="button" className={a} onClick={onClickTab}>
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
