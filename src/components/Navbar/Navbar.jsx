import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import api from '../../api/_api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';


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
                <Link to="/" className={styles["navbar-logo"]}>
                    motif
                </Link>

                <ul className={styles["navbar-menu"]}>
                    <li className={styles["navbar-item"]}>
                        <Link to="/dummy1" className={styles["navbar-link"]}>Explore</Link>
                    </li>
                    <li className={styles["navbar-item"]}>
                        <Link to="/dummy2" className={styles["navbar-link"]}>User</Link>
                    </li>
                </ul>

                { user ? 
                    <div>
                        <p>{user.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    : (
                        <Link to="/login" state={{ loginRedirect: `${location.pathname}?${location.search}` }}>
                            <button>Login</button>
                        </Link>
                    )
                }
                
            </div>
        </nav>
    );
};
