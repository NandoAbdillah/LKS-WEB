import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './utils/router'

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
