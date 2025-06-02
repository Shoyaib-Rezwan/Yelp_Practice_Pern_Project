//imports
const express = require("express")
require("dotenv").config()
const db = require("./db")
var cors = require("cors")

//variables
const app = express()
const port = process.env.PORT || 3001

app.use(cors())

//routers

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  const result = await db.query("SELECT R1.*, AVG(R2.RATING) AS AVG_RATING FROM RESTAURANT R1 LEFT JOIN REVIEWS R2 ON (R1.REST_ID=R2.REST_ID) GROUP BY R1.REST_ID")
  // console.log(result)
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      restaurants: result.rows,
    },
  })
})

//get a particular restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  const result = await db.query(
    "SELECT R1.*, AVG(R2.RATING) AS AVG_RATING FROM RESTAURANT R1 LEFT JOIN REVIEWS R2 ON (R1.REST_ID=R2.REST_ID) WHERE R1.REST_ID=$1 GROUP BY R1.REST_ID",
    [req.params.id]
  )
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      restaurant: result.rows[0],
    },
  })
})

//create a restaurant
app.use(express.json())
app.post("/api/v1/restaurants", async (req, res) => {
  const result = await db.query(
    "INSERT INTO RESTAURANT(NAME,LOCATION,PRICE_RANGE) VALUES($1,$2,$3) returning*",
    [req.body.name, req.body.location, req.body.price_range]
  )
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      restaurant: result.rows[0],
    },
  })
})

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const result = await db.query(
    "UPDATE RESTAURANT SET NAME=$1, LOCATION=$2, PRICE_RANGE=$3 WHERE REST_ID=$4 RETURNING *",
    [req.body.name, req.body.location, req.body.price_range, req.params.id]
  )
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      restaurant: result.rows[0],
    },
  })
})

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  await db.query("delete from restaurant where rest_id=$1", [req.params.id])
  res.status(200).json({
    status: "success",
  })
})

//get all the reviews of a particular restaurant
app.get("/api/v1/restaurants/:id/reviews", async (req, res) => {
  const result = await db.query("SELECT * FROM REVIEWS WHERE REST_ID=$1", [
    req.params.id,
  ])
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      reviews: result.rows,
    },
  })
})

//Add a new review
app.post("/api/v1/restaurants/reviews", async (req, res) => {
  const result = await db.query(
    "INSERT INTO REVIEWS(REST_ID,NAME, RATING, REVIEW_TEXT) VALUES($1,$2,$3,$4) RETURNING *",
    [req.body.rest_id,req.body.name, req.body.rating, req.body.review_text]
  )
  res.status(200).json({
    status: "success",
    data_length: result.rows.length,
    data: {
      review: result.rows[0],
    },
  })
})

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})
