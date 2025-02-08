const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    StudentId: String,
    StudentName: String,
    Module: String
});


const User = mongoose.model('User', userSchema, 'users'); // 'users' is the collection name

module.exports = {
    getUserById: async (id) => await User.findOne({ StudentId: id }) || { error: 'User not found' },
    createUser: async (userData) => await User.create(userData),
    updateUser: async (id, updateData) => await User.findOneAndUpdate({ StudentId: id }, updateData, { new: true }) || { error: 'User not found' },
    deleteUser: async (id) => await User.findOneAndDelete({ StudentId: id }) || { error: 'User not found' }
};