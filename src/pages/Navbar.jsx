import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User } from 'react-feather';
import LoginModal from '../components/LoginModal';
import { useCurrentUser, useGlobalSearch } from '../utils/hooks';


export default function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const currentUser = useCurrentUser();
    const { query, setQuery } = useGlobalSearch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setQuery(e.target.value);
        if (e.target.value.trim()) navigate('/search');
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" 
                    className="navbar-logo clickable" 
                    onClick={() => setQuery('')}
                >
                    motif
                </Link>

                <input className="global-searchbar"
                    type="search"
                    value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    onChange={handleSearch}
                    placeholder="Search for music"
                />

                <div className='navbar-user-options'>
                    <div className='user-dropdown'>
                        { currentUser.userId ? 
                            <UserDropdown user={currentUser} /> 
                            : <LoginButton onClick={() => setModalOpen(true)} />
                        }
                    </div>
                </div>
            </div>

            { modalOpen && 
                <LoginModal 
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            }
        </nav>
    );
};


function UserDropdown({ user }) {
    const { handleLogout } = useCurrentUser();

    return (
        <div className='dropdown-container'>
            <div className='navbar-user'>
                <h3>{user.displayName}</h3>
                <User className='user-icon clickable' /> 
            </div>
            
            <ul className='dropdown-menu'>
                <li><Link to={`/user/${user?.userId}`}>Profile</Link></li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>    
    )
};


function LoginButton({ onClick }) {
    return (
        <button className='login-btn'
            onClick={onClick}
        >
            Login
        </button>
    );
};
