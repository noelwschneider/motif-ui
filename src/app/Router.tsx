import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterForm from '../pages/Register';
import Navbar from '../pages/Navbar';
import UserProfile from '../pages/UserProfile';
import GlobalSearchResults from '../pages/GlobalSearchResults';
import ArtistProfile from '../pages/ArtistProfile';


export default function AppRouter() {

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                
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
            </Routes>
        </Router>
    );
};
