import './App.scss'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { ItemDetailContainer } from "./Components/ItemDetailContainer/ItemDetailContainer";
import { Home } from "./Screens/Home";
import { AboutUs } from './Screens/AboutUs';
import { Contact } from './Screens/Contact';
import { Footer } from './Components/Footer/Footer.jsx';
import { Admin } from "./Screens/Admin/Admin.jsx";
import { Login } from './Screens/Login.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { RedirectIconContainer as RIconContainer } from './Components/RedirectIcon/RedirectIconContainer.jsx';
import logo from './assets/logo2.png';
import { Navbar } from './Components/Header/Navbar.jsx';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/admin"
                        element={<PrivateRoute
                            to={'/login'}><Admin />
                        </PrivateRoute>}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/*"
                        element={
                            <>
                                <Header className='grid'>
                                    <Link to={'/'} className='logo'>
                                        <img src={logo} alt="SoftDreams" />
                                    </Link>
                                    <Navbar />
                                </Header>
                                <main>
                                    <RIconContainer />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/nosotros" element={<AboutUs />} />
                                        <Route path="/contacto" element={<Contact />} />
                                        <Route path="/products/:model" element={<ItemDetailContainer />} />
                                    </Routes>
                                </main>
                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;