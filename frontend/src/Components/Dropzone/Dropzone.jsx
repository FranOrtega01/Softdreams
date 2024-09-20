import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsFillXCircleFill } from 'react-icons/bs'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Dropzone.scss'

export const Dropzone = ({ id, setPreviewFiles, photosError, previewFiles, files, setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {

            // Actualizar 'photos' (los archivos subidos)
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
            ]);

            // Actualizar 'previewPhotos' sin sobrescribir el estado anterior
            setPreviewFiles(previousPreviewPhotos => {
                // Crear las nuevas fotos en el formato correcto
                const newPrevFiles = acceptedFiles.map(file => {
                    const name = file.name.toLowerCase().replace(/\s+/g, '-');
                    return {
                        name,
                        preview: URL.createObjectURL(file)
                    };
                });
                return [...previousPreviewPhotos, ...newPrevFiles];
            });
        }
    }, [setFiles, setPreviewFiles]);

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
        },
        maxSize: 1024 * 5000,
    })

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
        setPreviewFiles(previewFiles => previewFiles.filter(file => file.name !== name));
    }

    const onDragEnd = result => {

        const { destination, source } = result;
        if (!destination) return;

        const reorderedFiles = Array.from(previewFiles);
        const [removed] = reorderedFiles.splice(source.index, 1);
        reorderedFiles.splice(destination.index, 0, removed);

        setPreviewFiles(reorderedFiles);
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <>
            <article id={id} className='mt-4'>
                <div {...getRootProps({
                    style
                })}
                >
                    <input  {...getInputProps({})} />
                    {
                        !isDragActive ? (
                            <>
                                <p>Solta los archivos aquí, o hace click para seleccionar.</p>
                                <p>Solo jpg, jpeg y png.</p>
                            </>
                        ) :

                            isDragReject ?
                                <p>Invalid file type</p> :

                                <p>Drop the files here...</p>
                    }
                </div>

                {/* Preview */}
                {files && <h4 className='mt-2' style={{ fontSize: 20 }}>Fotos ({previewFiles.length})</h4>}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='photos' direction='horizontal'>
                        {(provided) => (
                            <ul className='dropzoneList' {...provided.droppableProps} ref={provided.innerRef}>
                                {previewFiles?.map((file, index) => (
                                    <Draggable key={file.name} draggableId={file.name} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={provided.draggableProps.style}
                                            >
                                                <img
                                                    src={file.preview || file[index]}
                                                    alt={file.name}
                                                    height={100}
                                                    onLoad={() => {
                                                        URL.revokeObjectURL(file.preview)
                                                    }}
                                                />
                                                <button
                                                    aria-label='Borrar foto'
                                                    type='button'
                                                    onClick={() => removeFile(file.name)}
                                                >
                                                    <BsFillXCircleFill fontSize={24} />
                                                </button>
                                                <p>{file.name}</p>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <p className='error'>{photosError}</p>
            </article>
        </>
    )
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: 400,
    cursor: 'pointer',
    userSelect: 'none'


};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#2196f3'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


