import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import RestaurantFinder from "../apis/RestaurantFinder"

const RestaurantUpdate = () => {
  const { id } = useParams()
  const rest_id = id
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    const response = await RestaurantFinder.put(`/${rest_id}`, {
      rest_id: { rest_id },
      name: data.name,
      location: data.location,
      price_range: data.price_range,
    })
    console.log(response)
  }

  return (
    <>
      <header className="display-3 fw-light text-center">
        Restaurant Update
      </header>
      <div className="container p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label px-2 fw-semibold mt-3">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            {...register("name", {
              required: { value: true, message: "Please fil the name" },
            })}
          />
          {errors.name && (
            <div
              className="alert alert-danger text-center mx-2 p-1 mt-2"
              role="alert"
            >
              {errors.name.message}
            </div>
          )}
          <label className="form-label px-2 fw-semibold mt-3">Location</label>
          <input
            type="text"
            placeholder="Location"
            className="form-control"
            {...register("location", {
              required: { value: true, message: "Please fil the location" },
            })}
          />
          {errors.location && (
            <div
              className="alert alert-danger text-center mx-2 p-1 mt-2"
              role="alert"
            >
              {errors.location.message}
            </div>
          )}
          <label className="form-label px-2 fw-semibold mt-3">
            Price Range
          </label>
          <select
            className="form-select"
            {...register("price_range", {
              required: { value: true, message: "Please fil the price_range" },
            })}
          >
            <option value="" hidden>
              Select Price Range
            </option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
          {errors.price_range && (
            <div
              className="alert alert-danger text-center mx-2 p-1 mt-2"
              role="alert"
            >
              {errors.price_range.message}
            </div>
          )}
          <div className="container d-flex justify-content-center mt-5">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RestaurantUpdate
