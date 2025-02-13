import styles from './Search.module.css';
import { useState } from 'react';
import { useSearch } from 'hooks/_hooks';
import SearchItem from './SearchItem';


// todo: pagination
export default function SearchResultsUi() {
    const { loading, searchResults } = useSearch();
    const [contentType, setContentType] = useState<'artists' | 'albums' | 'tracks'>('artists');

    return (
        <div className={styles['search-results']}>
            <fieldset className={styles['content-type-radio-group']}>
                { (['artists', 'albums', 'tracks']).map((type, ix) => (
                    <div key={`content-radio-${type}-${ix}`}>
                        <input id={`content-choice-${type}`}
                            className={styles['content-type-radio-btn']}
                            type="radio"
                            name="contentType"
                            value={type}
                            checked={contentType === type}
                            onChange={(e) => setContentType(e.target.value as 'artists' | 'albums' | 'tracks')}
                        />

                        <label htmlFor={`content-choice-${type}`}>
                            {type}
                        </label>
                    </div>
                ))}
            </fieldset>
    
            { loading ? 
                Array.from({length: 10}, (_, index) => <SearchItemSkeleton index={index} />)
                
                : searchResults?.[contentType].map((item) => <SearchItem item={item} />)
            }
        </div>
    );
};


function SearchItemSkeleton({ index }) {
    return (
        <div key={`skeleton-${index}`} className={styles['skeleton-item']}>
            <div className={styles['skeleton-img']}></div>
            <div className={styles['skeleton-text']}></div>
        </div>
    );
};
