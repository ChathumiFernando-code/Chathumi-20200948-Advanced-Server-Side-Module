const User = require("../models/User");

class UserDAO {
    static async insertUser(name, email) {
        const user = new User({ name, email });
        return await user.save();
    }

    static async getUsers() {
        return await User.find();
    }
}

module.exports = UserDAO;
