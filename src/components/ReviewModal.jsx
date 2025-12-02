import { useEffect, useRef, useState } from 'react';
import api from '../app/api';
import { Star, Trash2, X } from 'react-feather';
import { useCurrentUser } from '../utils/hooks';


// todo: close if no spotifyId in data prop
export default function ReviewModal({ 
    data, 
    isOpen,
    onClose, 
    onSubmit,
}) {
    const [rating, setRating] = useState(data?.rating || 0);
    const [hoverRating, setHoverRating] = useState(0);

    const displayRating = hoverRating || rating;
    const dialogRef = useRef(null);
    const { user } = useCurrentUser();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const comment = formData.get('comment')
        const isPrivate = formData.get('isPrivate') ? true : false;

        try {
            // id flag determines submit action (POST for new review, PUT for existing review)
            if (data.id) {
                await api.reviews.update(data.id, {
                    comment,
                    isPrivate,
                    rating,
                });
            } else {
                await api.reviews.create({
                    comment,
                    isPrivate,
                    rating,
                    spotifyArtistId: data.spotifyArtistId,
                    spotifyId: data.spotifyId
                });
            }
        } catch (err) {
            console.error(err);
        };

        if (onSubmit) onSubmit();
        handleClose();
    };

    const handleDelete = async () => {
        try {
            await api.reviews.delete(data.id)
        } catch (err) {
            console.error(err);
        }
    };

    return (<>
        <dialog className='review-modal' 
            ref={dialogRef} 
            open={isOpen}
        >
            <div className='modal-header'>
                <h1 className='modal-title'>
                    {data.title}
                </h1>

                <X className='close-btn clickable'
                    onClick={handleClose}
                />
            </div>

            { user ? 
                <form className="review-form"
                    onSubmit={handleSubmit}
                >
                    { data.id && 
                        <Trash2 className='delete-btn'
                            onClick={handleDelete}
                        >
                            Delete
                        </Trash2>
                    }

                    <textarea className='comment-text'
                        id="comment"
                        name="comment"
                        defaultValue={data?.comment || ''}
                        placeholder="Write your review here"
                    />

                    <label className="privacy-checkbox-label"
                        htmlFor="isPrivate"
                    >
                        <input className="privacy-checkbox"
                            type="checkbox"
                            id="isPrivate"
                            name="isPrivate"
                            defaultChecked={data?.isPrivate || false}
                        />
                        Private
                    </label>

                    <div className='rating-input'>
                        <div className='star-container'>
                            {[1, 2, 3, 4, 5].map((value) => (
                            <div className='star-wrapper'
                                key={value}
                                onMouseEnter={() => setHoverRating(value)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(value)}
                            >
                                <Star className='star-empty' />

                                {value <= displayRating && (
                                    <Star className={
                                        hoverRating ? 'star-hover' : 'star-full'
                                    }/>
                                )}
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-buttons">
                        <button className='cancel-btn'
                            type="button" onClick={handleClose}>
                            Cancel
                        </button>

                        <button className='save-btn' type="submit">
                            Save
                        </button>
                    </div>
                </form> 
                : <h2 className='warning-msg'>
                    You must be logged in to leave a review
                </h2>
            }     
        </dialog>
        
        <div className='modal-container'
            onClick={handleClose}
        ></div>
    </>);
};
