import React from "react"
import Header from "../Components/Header"
import RestaurantAdd from "../Components/RestaurantAdd"
import RestaurantList from "../Components/RestaurantList"
const HomePage = () => {
  return (
    <>
      <Header />
      <RestaurantAdd />
      <RestaurantList />
    </>
  )
}

export default HomePage
