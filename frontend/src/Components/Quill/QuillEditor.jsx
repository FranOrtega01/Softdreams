import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const QuillEditor = ({ initialContent, content, setContent }) => {

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        }
    }, [initialContent]);

    const handleContentChange = value => {
        setContent(value);
    };

    return (
        <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
        />
    );
};