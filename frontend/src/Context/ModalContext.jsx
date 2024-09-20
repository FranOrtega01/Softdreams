import React, { createContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { prodSchema } from '../Validations/product.validation.js';
import { TextInput } from '../Components/TextInput';
import { getProducts, deleteProduct as deleteProductById } from '../services/products.js';
import 'react-quill/dist/quill.snow.css'
import { Dropzone } from '../Components/Dropzone/Dropzone.jsx';
import { QuillEditor } from '../Components/Quill/QuillEditor.jsx';
import config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';

const ModalContext = createContext();

const ModalProvider = ({ children, updateProducts }) => {

    const [showProduct, setShowProduct] = useState(false);
    const [prodModel, setProdModel] = useState(null)
    const [prod, setProd] = useState({})

    const [photos, setPhotos] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]);

    const [photosError, setPhotosError] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(prodSchema)
    });

    const openProductModal = async (model = null) => {
        if (model) {
            reset();
            setProdModel(model);
            const products = await getProducts(model)

            // Format photos for Dropzone preview.
            const loadedPhotos = products[0].thumbnails.map((thumbnail) => {
                const nameSplit = thumbnail.split("/");
                const name = nameSplit[nameSplit.length - 1];
                
                return {
                    name,
                    preview: thumbnail,
                }
            })

            setProd(products[0]);

            setPreviewPhotos(loadedPhotos)
        }
        setShowProduct(true)
    }

    const closeModal = () => {
        prodModel && reset();
        setPreviewPhotos([])
        setPhotos([])
        setProdModel(null)
        setProd({});
        setShowProduct(false)
    };

    const resetContactForm = () => {
        setProdModel(null)
        setPhotos([])
        setProd({});
        reset()
    }
    const deleteProduct = async (id) => {
        closeModal();
        await deleteProductById(id);
        await updateProducts();

    }
    const onSubmit = async (data) => {
        setLoading(true);
        setPhotosError('')
        try {
            if (!previewPhotos.length && photos.length < 1) {
                setPhotosError("Al menos una foto es necesaria");
                return;
            }
            if (photos.length > 5) {
                setPhotosError("Máximo 5 fotos");
                return;
            }

            // Quill Editor
            data.descripcion = desc;

            // New Order Photos
            data.newOrder = previewPhotos.map(pp => pp.name)


            if (!prodModel) data.id = uuidv4();
            else data.id = prod.id;


            const formData = new FormData();
            // Data key-value
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value);
            }

            // Agregar archivos al FormData
            photos.forEach(file => {
                formData.append("photos[]", file);
            });

            const method = prodModel ? "PUT" : "POST";
            const uri = `${config.backAPI}/products/${method === 'POST' ? '' : '/' + prodModel}`
            const response = await fetch(uri, {
                method: method,
                credentials: 'include',

                body: formData
            })
            if (response.ok) {
                updateProducts();
                resetContactForm()
                closeModal()
            }
        }
        finally {
            setLoading(false)
        }
    }

    //#region Modal Content
    const modalShipContent = (
        <Modal
            size="lg"
            show onHide={closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title style={styles.title}>{prodModel ? 'Actualizar' : 'Agregar'}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form id="prodForm" className='row' onSubmit={handleSubmit(onSubmit)}>

                    <TextInput setValue={setValue} value={prod?.modelo} className={"form-control"} name={'modelo'} placeholder={'Modelo'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.medidas} size="col-6" className={"form-control"} name={'medidas'} placeholder={'Medidas'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.nucleo} size="col-6" className={"form-control"} name={'nucleo'} placeholder={'Nucleo'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.tela} size="col-6" className={"form-control"} name={'tela'} placeholder={'Tela'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.altura} size="col-6" className={"form-control"} name={'altura'} placeholder={'Altura'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.peso} size="col-6" className={"form-control"} name={'peso'} placeholder={'Peso'} register={register} errors={errors} />

                    <TextInput setValue={setValue} value={prod?.garantia} size="col-6" className={"form-control"} name={'garantia'} placeholder={'Garantia'} register={register} errors={errors} />

                    <QuillEditor content={desc} setContent={setDesc} initialContent={prod?.descripcion || desc} />

                    <Dropzone
                        previewFiles={previewPhotos}
                        setPreviewFiles={setPreviewPhotos}
                        files={photos}
                        setFiles={setPhotos}
                        photosError={photosError}
                        id={'Photos'}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button aria-label='Borrar' variant='danger' onClick={() => deleteProduct(prod._id)}> Borrar</Button>
                <div>
                    <Button aria-label='Cerrar' className='me-2' variant="secondary" style={{ fontSize: 16 }} onClick={closeModal}>
                        Cerrar
                    </Button>
                    <Button aria-label={prodModel ? 'Actualizar' : 'Agregar'} disabled={loading} style={styles.button} type='submit' form='prodForm' >
                        {prodModel ? 'Actualizar' : 'Agregar'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );

    return (
        <ModalContext.Provider value={{ openProductModal, closeModal }}>
            {children}
            {showProduct && modalShipContent}
        </ModalContext.Provider>
    );
}

export { ModalContext, ModalProvider };

const styles = {
    title: {
        fontSize: 20,
        color: '#858796'
    },
    button: {
        // fontSize: 16,
        // backgroundColor: '#6A5BE2',
        // borderColor: '#6A5BE2'
    }
}