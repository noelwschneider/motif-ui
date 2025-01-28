import styles from './Icon.module.css';


export default function IconButton({ icon, fn, color='primary' }) {
    
    return (
        <div className={styles['icon-button-wrapper']}>
            <button className={styles['icon-button'] + ` text-${color}`}
                onClick={fn}
            >
                { icon }
            </button>
        </div>
    )
};