import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import api from '../../api/_api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { User } from 'react-feather';


export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await api.auth.logout();
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
        }
    };

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-container"]}>
                <Link to="/" className={styles["navbar-logo"] + ' clickable'}>
                    motif
                </Link>

                <div className={styles['navbar-user-options']}>
                    { user ?  <User className={styles['user-icon'] + ' clickable'} /> : (
                        <Link to="/login" state={{ loginRedirect: `${location.pathname}?${location.search}` }}>
                            <button>Login</button>
                        </Link>
                    )}
                </div>
                
            </div>
        </nav>
    );
};
