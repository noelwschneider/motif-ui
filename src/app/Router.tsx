import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterForm from '../pages/Register';
import Navbar from '../pages/Navbar';
import UserProfile from '../pages/UserProfile';
import GlobalSearchResults from '../pages/GlobalSearchResults';
import ArtistProfile from '../pages/ArtistProfile';


const WithNavbar = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);


export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<WithNavbar />}>
                    <Route path="/search" 
                        element={<GlobalSearchResults />}
                    />
                    
                    <Route path="/artist/:artistId" 
                        element={<ArtistProfile />}
                    />

                    <Route path="/user/:userId"
                        element={<UserProfile />}
                    />

                    <Route path="/" element={<Home />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
};
