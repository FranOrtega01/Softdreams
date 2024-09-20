import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { ModalContext } from '../../Context/ModalContext';
import { AdminItem } from './AdminItem';
import { BedDouble } from 'lucide-react';
import { List } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';

export const Dashboard = ({ products }) => {
    const { openProductModal } = useContext(ModalContext);
    const [displayList, setDisplayList] = useState(false)

    return (
        <>
            <div className='adminControlsContainer'>
                <Button aria-label='Agregar Colchon' variant="primary" onClick={() => openProductModal()}>
                    <BedDouble className='me-2' />
                    Agregar Colchon
                </Button>
                <div>
                    <LayoutGrid size={32} color={!displayList ? "#1e40af" : "black"} onClick={() => setDisplayList(false)} />
                    <List size={32} color={displayList ? "#1e40af" : "black"} onClick={() => setDisplayList(true)} />
                </div>
            </div>
            <h2>Mis Colchones ({products.length})</h2>
            <section className={`adminProductContainer ${displayList && "list"}`} >
                {products?.map(p => <AdminItem list={displayList} product={p} openModal={openProductModal} key={p._id} />)}
            </section>
        </>
    );
}
