import { useState } from "react";
import styles from "./Sandbox.module.css";
import Modal from "components/Modal";


export default function Sandbox() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        console.log('modal has closed');
    };

    const handleOpen = () => {
        setIsOpen(true);
        console.log('modal has opened');
    };

    return (
        <div>
            <button onClick={handleOpen}>Open modal</button>
            <Modal className={styles['sandbox-modal']}
                containerClass={styles['sandbox-modal-container']}
                isOpen={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                styles={styles}
            >
                <h1>This is my modal</h1>
                <button onClick={handleClose}>Close modal</button>
            </Modal>
        </div>
    )
};