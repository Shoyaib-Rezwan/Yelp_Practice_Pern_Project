import React, { useContext, useEffect, useRef, useState } from "react"
import ReviewCard from "../Components/ReviewCard"
import Star_rating from "../Components/Star_rating"

import { useForm } from "react-hook-form"
import { RestaurantContext } from "../Contexts/RestaurantContexts"

import RestaurantFinder from "../apis/RestaurantFinder"
import { useParams } from "react-router-dom"

const RestaurantDetail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { id } = useParams()
  const rest_id = id

  const { currentRestaurant, setCurrentRestaurant } =
    useContext(RestaurantContext)

  useEffect(() => {
    const fetchData = async () => {
      let response = await RestaurantFinder.get(`/${rest_id}`)
      setCurrentRestaurant(response.data.data.restaurant)
    }
    fetchData()
  }, [])

  const [reviews, setReviews] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let response = await RestaurantFinder.get(`/${rest_id}/reviews`)
      setReviews(response.data.data.reviews)
    }
    fetchData()
  }, [])
  const onSubmit = async (data) => {
    const response = await RestaurantFinder.post("/reviews", {
      rest_id: rest_id,
      name: data.name,
      rating: data.rating,
      review_text: data.review_text,
    })
    setReviews([...reviews, response.data.data.review])
  }

  return (
    <>
      {(currentRestaurant===null || currentRestaurant===undefined) ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="container-fluid text-center display-2 mb-2 text-danger">
            {`${currentRestaurant.name}`}
          </div>
          <div className="container-fluid d-flex justify-content-center mb-5">
            <Star_rating
              rating={(() => {
                let sum = 0
                for (let { rating } of reviews) {
                  sum += rating
                }
                return sum / reviews.length
              })()}
            />
          </div>

          <div className="container-fluid m-1">
            <div className="row row-cols-3">
              {reviews.map((review) => {
                return (
                  <div className="col-4" key={review.review_id}>
                    <ReviewCard review={review} />
                  </div>
                )
              })}
            </div>
            <div className="container-fluid my-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row row-cols-2">
                  <div className="col-8">
                    <label className="form-label">Name</label>
                    <input
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please fill the name field",
                        },
                      })}
                      type="text"
                      placeholder="name"
                      className="form-control border border-dark border-1 mb-3"
                    />
                    {errors.name && (
                      <div
                        className="alert alert-danger p-1 text-center"
                        role="alert"
                      >
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="col-3">
                    <label className="form-label">Rating</label>
                    <select
                      {...register("rating", {
                        required: {
                          value: true,
                          message: "Please choose a rating",
                        },
                      })}
                      className="form-select border border-dark border-1 mb-3"
                    >
                      <option value="" hidden>
                        Select Rating
                      </option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {errors.rating && (
                      <div
                        className="alert alert-danger p-1 text-center"
                        role="alert"
                      >
                        {errors.rating.message}
                      </div>
                    )}
                  </div>
                  <div className="col-11">
                    <label className="form-label ">Your Comment</label>
                    <textarea
                      {...register("review_text")}
                      className="form-control border border-dark border-1 mb-3"
                      placeholder="Enter your comment about the restautant"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-warning">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RestaurantDetail
