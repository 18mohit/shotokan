import { useState } from 'react'
import './App.css'
import Header from './components/Navbar/Header'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import About_us from './components/pages/About/About_us';
import Team from './components/pages/Team/Team';
import Gallery from './components/pages/Gallery/Gallery';
import Footer from './components/Navbar/Footer';
import AddImage from './components/pages/Gallery/AddImage';
import Signup from './components/pages/Login/SignUp';
import SignInOwner from './components/pages/Login/SignInOwner';
import SignUpSensei from './components/pages/Login/SignUpSensei';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About_us />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/addimage" element={<AddImage />} />
        <Route path="/register/:role" element={<Signup />} />
        <Route path="/login/:role" element={<SignInOwner />} />
        <Route path="/create/sensei" element={<SignUpSensei />} />
        
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App;
