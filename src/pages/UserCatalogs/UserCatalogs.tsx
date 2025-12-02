import styles from "./UserCatalogs.module.css";


export default function UserCatalogs({ catalogs=[] }) {

    return (
        <div className={styles['user-catalogs']}>
            <p>count: {catalogs?.length}</p>
        </div>
    );
};
