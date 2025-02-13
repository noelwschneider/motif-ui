import styles from './Modal.module.css';
import { useEffect } from 'react';


export default function Modal({ 
    children, 
    isOpen,
    onClose,
    onSubmit,
}) {
    // todo: add configuration for scroll prevention
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

    const handleSubmit = () => {
        if (onSubmit) onSubmit();
        handleClose();
    };

    return (<>
        <dialog className={styles['modal-dialog']} 
            ref={dialogRef} 
            open={isOpen}
        >
            <div className={styles['modal-header']}>
                <h1 className={styles['modal-title']}>
                    {data.title}
                </h1>

                <X className={styles['close-btn'] + ' clickable'}
                    onClick={handleClose}
                />
            </div>

            <div className={styles['modal-body']}>
                { ...children }
            </div>

            {/* todo: add configuration for buttons (e.g. success/danger, confirmation, omit/include, etc.) */}
            <div className={styles['modal-footer']}>
                <button className={styles['cancel-btn']}
                    onClick={handleClose}
                >
                    Cancel
                </button>

                <button className={styles['confirm-btn']} 
                    onClick={handleSubmit}
                >
                    Confirm
                </button>
            </div>
        </dialog>
        
        <div className={styles['modal-container']}
            onClick={handleClose}
        ></div>
    </>);
};