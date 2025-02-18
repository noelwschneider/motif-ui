import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import api from 'app/api';
import { useState } from 'react';
import { User } from 'react-feather';
import LoginModal from 'components/LoginModal/LoginModal';
import { useCurrentUser, useGlobalSearch } from 'hooks';


export default function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const { user, setUser } = useCurrentUser();
    const { query, setQuery } = useGlobalSearch();

    const handleLogout = async () => {
        try {
            await api.auth.logout();
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
        };
    };

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-container"]}>
                <Link to="/" className={styles["navbar-logo"] + ' clickable'}>
                    motif
                </Link>

                <input className={styles["searchbar-input"]}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for music"
                />

                <div className={styles['navbar-user-options']}>
                    <div className={styles['user-dropdown']}>
                    { user ? 
                        <div className={styles['dropdown-container']}>
                            <div className={styles['navbar-user']}>
                                <h3>{user.displayName}</h3>
                                <User className={styles['user-icon'] + ' clickable'} /> 
                            </div>
                            
                            <ul className={styles['dropdown-menu']}>
                                <li>
                                    <Link to={`/user/${user?.userId}`}>Profile</Link>
                                </li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                        : <button className={styles['login-btn']}
                            onClick={() => setModalOpen(true)}
                        >
                            Login
                        </button>
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
