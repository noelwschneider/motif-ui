import { useEffect, useRef } from 'react';


export default function Modal({
    children=null,
    className='',
    containerClass='',
    isOpen,
    onClose,
    onOpen,
}) {
    // global styles can be overriden with a className in the parent stylesheet because they are cosmetic
    // module styles are harder to override because they are functional

    const dialogRef = useRef(null);

    const handleClose = () => {
        if (onClose) onClose();
        dialogRef.current?.close();
    };

    const handleOpen = () => {
        if (onOpen) onOpen();
        dialogRef.current?.showModal();
    };

    useEffect(() => {
        // prevent scrolling when open
        document.body.style.overflow = 'hidden';
        
        if (dialogRef?.current?.open && !isOpen) {
            handleClose();
        } else if (!dialogRef?.current?.open && isOpen) {
            handleOpen();
        };

        return () => document.body.style.overflow = 'unset';
        
    }, [isOpen]);

    return (<> { isOpen ? <>

            <dialog className={'motif-modal-dialog ' + className}
                ref={dialogRef} 
                open={isOpen}
            >
                { children }
            </dialog>

            <div 
                className={'motif-modal-container ' + containerClass}
                onClick={onClose}
            ></div>


    </> : null } </>)
};
