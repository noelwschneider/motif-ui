import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/LoginRegister/Login';
import Register from 'pages/LoginRegister/Register';
import Navbar from 'components/Navbar/Navbar';
import UserProfile from 'pages/UserProfile/UserProfile';


export default function AppRouter() {

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="user/:userId"
                    element={<UserProfile />}
                />

                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};
