import { useState, useEffect } from 'react';
import { getProducts } from '../services/products.js';

export const useProducts = (model = '') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getProducts(model);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [model]);

    return { products, getProducts, loading, error };
};