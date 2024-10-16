import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BookFilter } from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookFilter />
  </StrictMode>,
)
