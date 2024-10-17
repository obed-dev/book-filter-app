import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BookFilterApp} from './BookFilterFireBase'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookFilterApp  />
  </StrictMode>,
)
