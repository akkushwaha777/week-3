import React, { useState } from 'react';

const UserCard = ({ user, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        role: user.role,
        mobile: user.mobile || '',
        email: user.email || ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsUpdating(true);
        try {
            await onUpdate(user._id, formData);
            setIsEditing(false);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: user.name,
            role: user.role,
            mobile: user.mobile || '',
            email: user.email || ''
        });
    };

    return (
        <div className="card">
            <div className="card-content">
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="edit-input"
                        />
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="Role"
                            className="edit-input"
                        />
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="Mobile"
                            className="edit-input"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="edit-input"
                        />
                        <div className="button-group">
                            <button className="btn btn-update" onClick={handleSave} disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Update'}
                            </button>
                            <button className="btn btn-cancel" onClick={handleCancel} disabled={isUpdating}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>{user.name}</h2>
                        <span className="role">{user.role}</span>
                        {user.mobile && <p className="user-detail">📞 {user.mobile}</p>}
                        {user.email && <p className="user-detail">✉️ {user.email}</p>}
                        <div className="button-group">
                            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                            <button className="btn btn-delete" onClick={() => onDelete(user._id)}>
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCard;
