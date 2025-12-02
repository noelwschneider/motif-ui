import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../app/api';


export default function UserProfile() {
    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState(null);

    // todo: seems like it ought to be a hook
    useEffect(() => {
        if (userProfile) return;
        
        let user = {};

        const fetchUserData = async () => {
            try {
                const userResponse = await api.user.fetchUser(userId);
                user = {...userResponse.data};
            } catch (err) {
                console.error(err);
            }
        };

        const fetchReviews = async () => {
            try {
                const reviewsResponse = null;
                user.reviews = reviewsResponse?.data;
            } catch (err) {
                console.error(err);
                user.reviews = [];
            };
        };

        const fetchCatalogs = async () => {
            try {
                const catalogsResponse = null;
                user.catalogs = catalogsResponse?.data;
            } catch (err) {
                console.error(err);
                user.catalogs = [];
            };
        };

        fetchUserData();
        fetchReviews();
        fetchCatalogs();
        setUserProfile(user);

        return () => setUserProfile(null);
    }, [userId, userProfile]);

    return (
        <div className='user'>
            <div className="profile-header">
                <div className='profile picture'>
                    Avatar / Pic
                </div>
                <h1>{userProfile?.displayName}</h1>
            </div>

            <div className="activity-container">
                <div className="reviews-summary">
                    <h2>Reviews</h2>
                    <div className='review-items'>
                        { userProfile?.reviews?.map((review) => (
                            <ReviewItem review={review} />
                        ))}
                    </div>
                </div>
                
                <div className="catalogs-summary">
                    <h2>Catalogs</h2>
                    <div className='catalog-items'>
                        { userProfile?.catalogs?.map((catalog) => (
                            <CatalogItem catalog={catalog} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


function ReviewItem({ review }) {
    return (
        <div className='review-item'>
            <div className='review-topline'>
                <div className='review-thumbnail'>pic</div>
                <h3 className='review-content-title'>Content Title</h3>
                <p className='review-rating'>Rating</p>
                <p className='review-date'>mm-dd-yyyy</p>
                <p className='review-comment'>Review comment</p>
            </div>
        </div>
    );
};


function CatalogItem({ catalog }) {
    return (
        <div className='catalog-item'>
            <div className='catalog-thumbnail'>pic</div>
            <h3 className='catalog-title'>title</h3>
        </div>
    );
};
