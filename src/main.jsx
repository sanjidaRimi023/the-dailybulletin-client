import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from './Provider/ThemeProvider.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
