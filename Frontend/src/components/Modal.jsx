import React from 'react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-delete-confirm" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
