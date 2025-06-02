import React from "react"
import Star_rating from "./Star_rating"
const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="card text-bg-primary mb-3">
        <div className="card-header  d-flex justify-content-between">
          {review.name}
          <span>
            <Star_rating rating={review.rating} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{review.review_text}</p>
        </div>
      </div>
    </>
  )
}

export default ReviewCard
