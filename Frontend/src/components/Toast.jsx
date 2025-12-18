import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className={`toast ${type}`}>
            <span className="toast-icon">
                {type === 'success' ? '✅' : '❌'}
            </span>
            <span className="toast-message">{message}</span>
        </div>
    );
};

export default Toast;
