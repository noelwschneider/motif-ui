import styles from './UserProfile.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from 'api';


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
        <div className={styles['user']}>
            <div className={styles["profile-header"]}>
                <div className={styles['profile picture']}>
                    Avatar / Pic
                </div>
                <h1>{userProfile?.displayName}</h1>
            </div>

            <div className={styles["activity-container"]}>
                <div className={styles["reviews-summary"]}>
                    <h2>Reviews</h2>
                    <div className={styles['review-items']}>
                        { userProfile?.reviews?.map((review) => (
                            <ReviewItem review={review} />
                        ))}
                    </div>
                </div>
                
                <div className={styles["catalogs-summary"]}>
                    <h2>Catalogs</h2>
                    <div className={styles['catalog-items']}>
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
        <div className={styles['review-item']}>
            <div className={styles['review-topline']}>
                <div className={styles['review-thumbnail']}>pic</div>
                <h3 className={styles['review-content-title']}>Content Title</h3>
                <p className={styles['review-rating']}>Rating</p>
                <p className={styles['review-date']}>mm-dd-yyyy</p>
                <p className={styles['review-comment']}>Review comment</p>
            </div>
        </div>
    )
};

function CatalogItem({ catalog }) {
    return (
        <div className={styles['catalog-item']}>
            <div className={styles['catalog-thumbnail']}>pic</div>
            <h3 className={styles['catalog-title']}>title</h3>
        </div>
    );
};