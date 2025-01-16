import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import api from '../../api/_api';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
          await api.auth.logout();
          navigate('/login');
        } catch (err) {
          console.error('Logout failed', err);
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
                        <Link to="/dummy1" className={styles["navbar-link"]}>Dummy Menu 1</Link>
                    </li>
                    <li className={styles["navbar-item"]}>
                        <Link to="/dummy2" className={styles["navbar-link"]}>Dummy Menu 2</Link>
                    </li>
                    <li className={styles["navbar-item"]}>
                        <Link to="/dummy3" className={styles["navbar-link"]}>Dummy Menu 3</Link>
                    </li>
                </ul>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};
