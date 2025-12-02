import { useEffect, useRef, useState } from 'react';
import { X } from 'react-feather';
import { useCurrentUser } from '../utils/hooks';


export default function LoginModal({
    isOpen,
    onClose, 
    onSubmit,
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dialogRef = useRef(null);
    const { handleLogin } = useCurrentUser();

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
          handleLogin(email, password);
          handleClose();
        } catch (err) {
          console.error(err);
        };

        if (onSubmit) onSubmit();
    };

    return (
        <div>
            <dialog className='login-modal'
                ref={dialogRef} 
                open={isOpen}
            >
                <div className='modal-header'>
                    <h1 className='modal-title'>
                        Login
                    </h1>

                    <X className='close-btn clickable'
                        onClick={handleClose}
                    />
                </div>
                

                <form onSubmit={handleSubmit}>
                    <div className='modal-inputs'>
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
          
                    <div className="modal-btns">
                        <button className='submit-btn'
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </dialog>

            <div className='modal-container'
                onClick={handleClose}
            ></div>
        </div>
    );
};
