import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import api from 'api';
import { useContext, useState } from 'react';
import { UserContext } from 'utils';
import { User } from 'react-feather';
import LoginModal from './LoginModal';


export default function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);

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

                {/* placing here instead of end of component to simplify horizontal spacing */}
                { modalOpen && 
                    <LoginModal 
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                }

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
        </nav>
    );
};
