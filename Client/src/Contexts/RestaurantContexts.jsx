import { createContext, useState } from "react"

// Create and export the context
export const RestaurantContext = createContext()

const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [currentRestaurant, setCurrentRestaurant] = useState(null)

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        currentRestaurant,
        setCurrentRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export default RestaurantContextProvider
