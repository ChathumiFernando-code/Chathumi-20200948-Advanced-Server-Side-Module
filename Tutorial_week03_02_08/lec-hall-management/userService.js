const userDAO = require('./userDAO');

module.exports = {
    getUserById: async (id) => await userDAO.getUserById(id),
    createUser: async (userData) => await userDAO.createUser(userData),
    updateUser: async (id, updateData) => await userDAO.updateUser(id, updateData),
    deleteUser: async (id) => await userDAO.deleteUser(id)
};