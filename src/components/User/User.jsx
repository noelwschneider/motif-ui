import styles from './User.module.css';

// outline of potential UI layout for 'user' site section
export default function User() {

    return (
        <div className={styles['user']}>
            <div className={styles["profile-header"]}>
                <div className={styles['profile picture']}>
                    Avatar / Pic
                </div>
                <h1>Username</h1>
                
            </div>

            <div className={styles["activity-container"]}>
                <div className={styles["reviews-summary"]}>
                    <h2>Reviews</h2>
                    <div className={styles['review-items']}>
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                    </div>
                </div>
                
                <div className={styles["catalogs-summary"]}>
                    <h2>Catalogs</h2>
                    <div className={styles['catalog-items']}>
                        <CatalogItem />
                        <CatalogItem />
                        <CatalogItem />
                        <CatalogItem />
                        <CatalogItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

function ReviewItem() {
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

function CatalogItem() {
    return (
        <div className={styles['catalog-item']}>
            <div className={styles['catalog-thumbnail']}>pic</div>
            <h3 className={styles['catalog-title']}>title</h3>
        </div>
    );
};