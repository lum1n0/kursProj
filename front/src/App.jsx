import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style__css/style.css';
import Slider from './components/Slider';
import AuthModal from './components/AuthModal'; 
import Home from './pages/Home';

function App({isLoggedIn, setIsLoggedIn}) {

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}/>      
      <main>
      <Routes> 
          <Route path='/' element={<Home />}/> 
        </Routes>       </main>
      <Footer />
      <AuthModal 
    isLoggedIn={isLoggedIn} 
    setIsLoggedIn={setIsLoggedIn}
    onLoginSuccess={() => {
      console.log("onLoginSuccess called"); // Add this line
      setIsLoggedIn(true);
    }}
/>



    </div>
  );
}

export default App;
