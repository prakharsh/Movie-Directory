import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
import Home from './components/Home'
import Login from './components/Login.js'
import Register from './components/Register.js'
import About from './components/About.js'
import Favorites from './components/Favorites.js'
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
              <Route
                exact path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                exact path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                exact path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
          </Routes>
        </UserAuthContextProvider>
     </BrowserRouter>
  );
}

export default App;
