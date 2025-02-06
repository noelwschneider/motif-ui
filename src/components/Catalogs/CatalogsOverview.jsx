import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import IconButton from '../Icon/IconButton';
import api from 'api';
import styles from './Catalogs.module.css';
import CatalogModal from './CatalogModal';


export default function CatalogsOverview() {
    const [catalogs, setCatalogs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCatalogs = async () => {
        setLoading(true);
        try {
            const response = await api.catalogs.getAll();
            setCatalogs(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load catalogs', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const handleDeleteCatalog = async (id) => {
        try { 
            await api.catalogs.delete(id);
            fetchCatalogs();
        } catch (err) {
            setError('Failed to delete catalog', err);
        }
    };

    const handleModal = (initialData) => {
        setModalData(initialData);
        setModalOpen(true);
    };

    return (
        <div className={styles['catalogs-container']}>
            <h1>My Catalogs</h1>

            <button onClick={() => handleModal(null)}>New Catalog</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul className={styles['catalog-list']}>
                    {catalogs.map((catalog) => (
                        <div className={styles['catalog-item']} key={catalog.id}>
                            <div className={styles['catalog-data']}>
                                <h2>{catalog.name}</h2>
                                <p>{catalog.description}</p>
                            </div>
                            <div className={styles['catalog-actions']}>
                                <IconButton icon={<Edit />} 
                                    fn={() => handleModal({
                                        name: catalog.name,
                                        description: catalog.description,
                                        isPrivate: catalog.isPrivate
                                    })}
                                />
                                <IconButton icon={<Trash2 />} 
                                    fn={() => handleDeleteCatalog(catalog.id)}
                                    color='danger'
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            )}

            <CatalogModal 
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setModalData(null);
                    fetchCatalogs();
                }}
                initialData={modalData}
            />
        </div>
    );
};
