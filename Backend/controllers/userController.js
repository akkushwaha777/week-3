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

        console.log('\n========== POST REQUEST RECEIVED ==========');
        console.log(`Timestamp: ${new Date().toLocaleString()}`);
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
        console.log('===========================================\n');

        if (!name || !role) {
            return res.status(400).json({ success: false, message: 'Please provide both name and role' });
        }

        const newUser = await User.create({ name, role, mobile, email });

        console.log('✅ User created successfully:', newUser.name);

        res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error('❌ Error creating user:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, role, mobile, email } = req.body;
        const userId = req.params.id;

        console.log('\n========== PUT REQUEST RECEIVED ==========');
        console.log(`Timestamp: ${new Date().toLocaleString()}`);
        console.log(`Target User ID: ${userId}`);
        console.log('Update Data:', JSON.stringify(req.body, null, 2));

        const updateData = {};
        if (name) updateData.name = name;
        if (role) updateData.role = role;
        if (mobile) updateData.mobile = mobile;
        if (email) updateData.email = email;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.log('❌ User not found with ID:', userId);
            console.log('===========================================\n');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('✅ User updated successfully:', updatedUser.name);
        console.log('===========================================\n');

        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error('❌ Error updating user:', error.message);
        console.log('===========================================\n');
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
