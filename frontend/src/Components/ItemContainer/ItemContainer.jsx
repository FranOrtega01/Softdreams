import React, { useState, useEffect } from 'react'
import { Item } from './Item';
import './ItemContainer.scss';
import { getProducts } from '../../services/products';
import { Loading } from '../Loading/Loading';

const BACK_URL = "http://127.0.0.1:8080"

export const ItemContainer = () => {

    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false);

    const useProducts = async () => {
        setLoad(true);
        const products = await getProducts();
        setProducts(products);
        setLoad(false);
    }

    useEffect(() => {
        useProducts();
    }, []);

    return (
        <section className={"prodContainer"}>
            {load ? <Loading /> :
                products?.map(p => (
                    <Item key={p.id} product={p} />
                ))
            }
        </section>
    )
}
