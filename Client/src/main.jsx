import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from "./Routes/HomePage.jsx"
import RestaurantDetail from "./Routes/RestaurantDetail.jsx"
import RestaurantUpdate from "./Routes/RestaurantUpdate.jsx"
import RestaurantContextProvider from "./Contexts/RestaurantContexts.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetail />,
  },
  {
    path: "/restaurants/:id/update",
    element: <RestaurantUpdate />,
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RestaurantContextProvider>
      <App />
      <RouterProvider router={router} />
    </RestaurantContextProvider>
  </StrictMode>
)
