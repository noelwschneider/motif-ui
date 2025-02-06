import { useRef } from 'react';
import IconButton from '../Icon/IconButton';
import api from '../../util/api/_api';
import styles from './Catalogs.module.css';


export default function CatalogModal({ isOpen, onClose, initialData }) {
    const dialogRef = useRef(null);
    const onSubmit = initialData ? api.catalogs.update : api.catalogs.create;

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const catalogData = {
            name: formData.get('name'),
            description: formData.get('description'),
            isPrivate: formData.get('isPrivate'),
        };
        onSubmit(catalogData);
        handleClose();
    };

    return (
        <dialog ref={dialogRef} open={isOpen} className={styles['catalog-modal']}>
            <form onSubmit={handleSubmit} className={styles["catalog-form"]}>
                <h2>{initialData ? 'Edit Catalog' : 'Create Catalog'}</h2>

                <label htmlFor="name">Name:</label>
                <textarea
                    id="name"
                    name="name"
                    rows="1"
                    defaultValue={initialData?.name || ''}
                    placeholder="Catalog Name..."
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    defaultValue={initialData?.description || ''}
                    placeholder="Description..."
                />

                <label htmlFor="isPrivate" className={styles["privacy-checkbox"]}>
                    <input
                        type="checkbox"
                        id="isPrivate"
                        name="isPrivate"
                        defaultChecked={initialData?.isPrivate || false}
                    />
                    Private
                </label>

                <div className={styles["modal-actions"]}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </dialog>
    );
};
