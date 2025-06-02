import React from "react"
import { useForm } from "react-hook-form"
import RestaurantFinder from "../apis/RestaurantFinder"
import { useContext } from "react"
import { RestaurantContext } from "../Contexts/RestaurantContexts"

const RestaurantAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { restaurants, setRestaurants } = useContext(RestaurantContext)

  const onSubmit = async (data) => {
    try {
      const response = await RestaurantFinder.post("/", data)
      const newRestaurant = response.data.data.restaurant // adjust according to your API response
      //response.data.data.restaurant
      setRestaurants([...restaurants, response.data.data.restaurant])
    } catch (error) {
      console.error("Failed to add restaurant:", error)
    }
  }

  return (
    <>
      <div className="container-fluid mb-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <input
                {...register("name", {
                  required: { value: true, message: "You must fill the name" },
                })}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col">
              <input
                {...register("location", {
                  required: {
                    value: true,
                    message: "You must fill the location",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="Location"
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                defaultValue={"Price Range"}
                {...register("price_range", {
                  required: {
                    value: true,
                    message: "You must fill the price_range",
                  },
                })}
              >
                <option value="" hidden>
                  Price Range
                </option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <button className="btn btn-primary col-1 me-1">Add</button>
          </div>
        </form>
      </div>
      {errors.location && (
        <div className="alert alert-danger text-center mx-2 p-2" role="alert">
          {errors.location.message}
        </div>
      )}
      {errors.name && (
        <div className="alert alert-danger text-center mx-2 p-2" role="alert">
          {errors.name.message}
        </div>
      )}
      {errors.price_range && (
        <div className="alert alert-danger text-center mx-2 p-2" role="alert">
          {errors.price_range.message}
        </div>
      )}
    </>
  )
}

export default RestaurantAdd
