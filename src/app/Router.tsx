import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar/Navbar';
import UserProfile from '../components/UserProfile/UserProfile';


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

                <Route
                path="/home"
                element={<Home />}
                />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};
