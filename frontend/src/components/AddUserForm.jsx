import React, { useState } from 'react';

const AddUserForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({ name: '', role: '', mobile: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.role) return;

        onAdd(formData);
        setFormData({ name: '', role: '', mobile: '', email: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-user-section">
            <h3>Add New Team Member</h3>
            <form onSubmit={handleSubmit} className="add-user-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="add-input"
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    className="add-input"
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="add-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="add-input"
                />
                <button type="submit" className="btn btn-add">Add Member</button>
            </form>
        </div>
    );
};

export default AddUserForm;
