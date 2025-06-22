import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StandarLayouts } from './layouts/StandarLayouts'
import Home from './pages/home/Home'

const router = createBrowserRouter([
  {
    element: <StandarLayouts/>,
    children: [
      {path: "/", element: <Home />}
    ]
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router}/>      
    </>
  )
}

export default App
