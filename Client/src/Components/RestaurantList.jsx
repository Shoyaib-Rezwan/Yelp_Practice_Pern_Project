import React, { useContext, useEffect } from "react"
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantContext } from "../Contexts/RestaurantContexts"
import { Link, useNavigate } from "react-router-dom"
import Star_rating from "./Star_rating"

const price_to_dollar = (price) => {
  let str = "$$$$$"
  return str.slice(0, price)
}

const RestaurantList = () => {
  const navigate = useNavigate()

  const { restaurants, setRestaurants } = useContext(RestaurantContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get("/")
        setRestaurants(res.data.data.restaurants)
      } catch ({ error }) {}
    }
    fetchData()
  }, [])

  const onDelete = async (rest_id) => {
    const res = await RestaurantFinder.delete(`/${rest_id}`)
    console.log(res)
    setRestaurants(
      restaurants.filter((r) => {
        return r.rest_id !== rest_id
      })
    )
  }
  const { currentRestaurant, setCurrentRestaurant } =
    useContext(RestaurantContext)

  const handleRowClick = (e, restaurant) => {
    setCurrentRestaurant(restaurant)
    navigate(`/restaurants/${restaurant.rest_id}`)
    console.log(restaurant)
  }
  return (
    <>
      <div className="container-fluid">
        <table className="table table-dark table-hover text-center">
          <thead>
            <tr className="table-primary  fw-bold">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={(e) => handleRowClick(e, restaurant)}
                    key={restaurant.rest_id}
                    style={{ cursor: "pointer" }}
                  >
                    <td scope="col" className="p-3">
                      {restaurant.name}
                    </td>
                    <td scope="col" className="p-3">
                      {restaurant.location}
                    </td>
                    <td scope="col" className="p-3">
                      {price_to_dollar(restaurant.price_range)}
                    </td>
                    <td scope="col" className="p-3">
                      <Star_rating rating={restaurant.avg_rating} />
                    </td>
                    <td scope="col">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/restaurants/${restaurant.rest_id}/update`)
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td scope="col">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(restaurant.rest_id)
                        }}
                        className="btn btn-danger"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RestaurantList
