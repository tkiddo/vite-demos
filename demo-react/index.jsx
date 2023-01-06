import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, Outlet } from 'react-router-dom'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router}>
    <Outlet />
  </RouterProvider>
)
