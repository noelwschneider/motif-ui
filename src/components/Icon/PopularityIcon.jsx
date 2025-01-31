import { BarChart } from 'react-feather';
import styles from './Icon.module.css';

export default function PopularityIcon({ popularity, scale=100 }) {
    const pct = popularity / scale;
    let heat = '';
    switch (true) {
        case (pct >= 1):
            heat = 'wtf';
            break;
        case (pct >= 0.75):
            heat = 'hot';
            break;
        case (pct >= 0.5):
            heat = 'warm';
            break;
        case (pct >= 0.25):
            heat = 'cool';
            break;
        default:
            heat = 'cold';
    };

    return (
        <BarChart className={styles[`popularity-icon-${heat}`]} 
            size={'100%'}
        />
    )
};
