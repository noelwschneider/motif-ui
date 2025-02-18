import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { User } from 'react-feather';
import LoginModal from 'components/LoginModal/LoginModal';
import { useCurrentUser, useGlobalSearch } from 'hooks';


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
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-container"]}>
                <Link to="/" 
                    className={styles["navbar-logo"] + ' clickable'} 
                    onClick={() => setQuery('')}
                >
                    motif
                </Link>

                <input className={styles["global-searchbar"]}
                    type="search"
                    value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    onChange={handleSearch}
                    placeholder="Search for music"
                />

                <div className={styles['navbar-user-options']}>
                    <div className={styles['user-dropdown']}>
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
        <div className={styles['dropdown-container']}>
            <div className={styles['navbar-user']}>
                <h3>{user.displayName}</h3>
                <User className={styles['user-icon'] + ' clickable'} /> 
            </div>
            
            <ul className={styles['dropdown-menu']}>
                <li><Link to={`/user/${user?.userId}`}>Profile</Link></li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>    
    )
};


function LoginButton({ onClick }) {
    return (
        <button className={styles['login-btn']}
            onClick={onClick}
        >
            Login
        </button>
    );
};
