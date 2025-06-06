import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import routers from './utils/router.jsx'
import { ContextProvider } from './utils/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ContextProvider>
      <RouterProvider router={routers}>
        <App />
      </RouterProvider>
    </ContextProvider>



  </StrictMode>,
)
