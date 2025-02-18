import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/LoginRegister/Login';
import Register from 'pages/LoginRegister/Register';
import Navbar from 'pages/Navbar/Navbar';
import UserProfile from 'pages/UserProfile/UserProfile';
import GlobalSearchResults from 'pages/GlobalSearchResults/GlobalSearchResults';
import ArtistProfile from 'pages/ArtistProfile/ArtistProfile';


export default function AppRouter() {

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
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
