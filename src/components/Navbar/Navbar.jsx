import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { User } from 'react-feather';
import LoginModal from 'components/LoginModal/LoginModal';
import { useCurrentUser, useGlobalSearch } from 'hooks';


export default function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useCurrentUser();
    const { query, setQuery } = useGlobalSearch();

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-container"]}>
                <Link to="/" className={styles["navbar-logo"] + ' clickable'}>
                    motif
                </Link>

                <input className={styles["global-searchbar"]}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for music"
                />

                <div className={styles['navbar-user-options']}>
                    <div className={styles['user-dropdown']}>
                        { user ? 
                            <UserDropdown user={user} /> 
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
