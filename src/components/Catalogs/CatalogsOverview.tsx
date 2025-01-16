import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import IconButton from '../IconButton/IconButton';
import api from '../../api/_api';
import styles from './Catalogs.module.css';


export default function CatalogsOverview() {
    const [catalogs, setCatalogs] = useState([]);
    const [newCatalog, setNewCatalog] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCatalogs = async () => {
        setLoading(true);
        try {
            const response = await api.catalogs.getAll();
            setCatalogs(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load catalogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const handleCreateCatalog = async (e) => {
        e.preventDefault();
        if (!newCatalog.name) {
            setError('Name is required');
            return;
        }
        try {
            await api.catalogs.create({
                description: newCatalog.description,
                name: newCatalog.name,
                isPrivate: false
            });
            setNewCatalog({ name: '', description: '' });
            fetchCatalogs();
        } catch (err) {
            setError('Failed to create catalog');
        }
    };

    const handleUpdateCatalog = async (catalog) => {
        // todo: add form to edit details
        // todo: refactor api.catalogs.update to just take the whole catalog object and handle the properties internally

        // const { id, description, name, isPrivate } = catalog;
        // await api.catalogs.update(id, { description, name, isPrivate });
        // fetchCatalogs();
    };

    const handleDeleteCatalog = async (id) => {
        try { 
            await api.catalogs.delete(id);
            fetchCatalogs();
        } catch (err) {
            setError('Failed to delete catalog');
        }
    };

    return (
        <div className={styles['catalogs-container']}>
            <h1>My Catalogs</h1>

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
                                <IconButton icon={<Edit />} />
                                <IconButton icon={<Trash2 />} 
                                    fn={() => handleDeleteCatalog(catalog.id)}
                                    color='danger'
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            )}

            {/* todo: extract this form to a modal */}
            <form onSubmit={handleCreateCatalog} className={styles['catalog-form']}>
                <h2>Create New Catalog</h2>
                <input
                    type="text"
                    placeholder="Catalog Name"
                    value={newCatalog.name}
                    onChange={(e) => setNewCatalog({ ...newCatalog, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={newCatalog.description}
                    onChange={(e) => setNewCatalog({ ...newCatalog, description: e.target.value })}
                />
                <button type="submit">Create Catalog</button>
            </form>
        </div>
    );
};
