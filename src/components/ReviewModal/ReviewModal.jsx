import { useRef } from 'react';
import styles from './ReviewModal.module.css';


export default function ReviewModal({ isOpen, onClose, onSubmit, initialData }) {
    const dialogRef = useRef(null);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        if (onClose) onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const reviewData = {
            rating: formData.get('rating'),
            comment: formData.get('comment'),
            isPrivate: formData.get('isPrivate'),
        };
        if (onSubmit) onSubmit(reviewData);
        handleClose();
    };

    const deleteReview = () => {};

    return (
        <dialog ref={dialogRef} open={isOpen} className={styles['review-modal']}>
            <form onSubmit={handleSubmit} className={styles["review-form"]}>
                <h2>{initialData ? 'Edit Review' : 'Create Review'}</h2>

                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="10"
                    defaultValue={initialData?.rating || ''}
                    required 
                />

                <label htmlFor="comment">Review:</label>
                <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    defaultValue={initialData?.comment || ''}
                    placeholder="Write your review here..."
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
