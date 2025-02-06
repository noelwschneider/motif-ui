import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../util/context/UserContext';
import { X } from 'react-feather';
import styles from './Navbar.module.css';
import api from '../../util/api/_api';


export default function LoginModal({
    isOpen,
    onClose, 
    onSubmit,
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dialogRef = useRef(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        // prevent scrolling when open
        document.body.style.overflow = 'hidden';
        
        if (dialogRef?.current?.open && !isOpen) {
            dialogRef.current?.close();
        } else if (!dialogRef?.current?.open && isOpen) {
            dialogRef.current?.showModal();
        };

        return () => document.body.style.overflow = 'unset';
    }, [isOpen]);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        };

        if (onClose) onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const loginResponse = await api.auth.login({ email, password });
          setUser(loginResponse?.data);
          handleClose();
        } catch (err) {
          console.error(err);
        };

        if (onSubmit) onSubmit();
    };

    return (
        <div>
            <dialog className={styles['login-modal']} 
                ref={dialogRef} 
                open={isOpen}
            >
                <div className={styles['modal-header']}>
                    <h1 className={styles['modal-title']}>
                        Login
                    </h1>

                    <X className={styles['close-btn'] + ' clickable'}
                        onClick={handleClose}
                    />
                </div>
                

                <form onSubmit={handleSubmit}>
                    <div className={styles['modal-inputs']}>
                        <input placeholder='Email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input placeholder='Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
          
                    <div className={styles["modal-btns"]}>
                        <button className={styles['submit-btn']}
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </dialog>

            <div className={styles['modal-container']}
                onClick={handleClose}
            ></div>
        </div>
    );
};
