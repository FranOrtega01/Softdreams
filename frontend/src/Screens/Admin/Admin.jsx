import React, { useState, useEffect, useContext } from 'react'
import { Dashboard } from './Dashboard';
import { ModalProvider } from '../../Context/ModalContext';
import { AuthContext } from '../../Context/AuthContext';
import { getProducts } from '../../services/products';
import './Admin.scss'
import { Header } from '../../Components/Header/Header';
import { User } from 'lucide-react';
import logo from '../../assets/favicon.png'
import { useNavigate } from 'react-router-dom';

export const Admin = () => {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const { currentUser, logout } = useContext(AuthContext)
    
    const updateProducts = async () => {
        const products = await getProducts();
        setProducts(products);
    }

    const handleLogout = async () => {
        const loginSuccessful = await logout();
        if (loginSuccessful) {
            navigate('/login');
        } else {
            return toast.error("Couldnt logout please refresh", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "light",
                style: {
                    fontSize: '18px'
                }
            })
        }
    }

    useEffect(() => {
        document.title = 'SoftDreams | Admin Dashboard';

        const fetchData = async () => {
            try {
                updateProducts();
            } catch {
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <Header className={"flex"}>
                <div>
                    <img src={logo} alt="SoftDreams" />
                    <h1>Admin Dashboard</h1>
                </div>
                <div>
                    <span>{currentUser?.name || ''} </span>
                    <User onClick={() => handleLogout()} size={32} color='white' />
                </div>
            </Header>
            <ModalProvider updateProducts={updateProducts}>
                <main id='AdminMain'>
                    <Dashboard products={products} />
                </main>
            </ModalProvider>
        </>
    );
}
