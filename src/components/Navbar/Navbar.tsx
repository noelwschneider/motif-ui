import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';


export default function Navbar() {
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
            </div>
        </nav>
    );
};
