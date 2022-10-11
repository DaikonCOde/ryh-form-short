import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home/Home'

import './App.css';

function App() {

  return (
    <div className='content-app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
