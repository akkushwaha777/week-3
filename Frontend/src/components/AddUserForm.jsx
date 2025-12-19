import React, { useState } from 'react';

const AddUserForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({ name: '', role: '', mobile: '', email: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await onAdd(formData);
            setFormData({ name: '', role: '', mobile: '', email: '' });
            setErrors({});
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    return (
        <div className="add-user-section">
            <h3>Add New Team Member</h3>
            <form onSubmit={handleSubmit} className="add-user-form">
                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`add-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`add-input ${errors.role ? 'error' : ''}`}
                    />
                    {errors.role && <span className="error-msg">{errors.role}</span>}
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="add-input"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="add-input"
                    />
                </div>
                <button type="submit" className="btn btn-add" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Member'}
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;
