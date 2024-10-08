import { useState } from 'react'
import SplashScreen from './modules/SplashScreen'
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './modules/SignUp';

function App() {
  const [splash, setSplash] = useState(true);
  const navigate = useNavigate();

  const handleSplashScreen = () => {
    setSplash(false);
    navigate('/signup');
  }

  return (
    <>
      {splash ?
        <SplashScreen clearScreen={handleSplashScreen} />
        :
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      }
    </>
  )
}

export default App
