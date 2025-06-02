import axios, { isCancel, AxiosError } from "axios"
const SERVER_PORT = 3000

export default axios.create({
  baseURL: `http://localhost:${SERVER_PORT}/api/v1/restaurants`,
})
