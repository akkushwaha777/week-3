const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, role, mobile, email } = req.body;
        if (!name || !role) {
            return res.status(400).json({ success: false, message: 'Please provide both name and role' });
        }

        const newUser = await User.create({ name, role, mobile, email });
        res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, role, mobile, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, role, mobile, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
