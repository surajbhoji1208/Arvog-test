const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        res.json({ message: 'User updated', user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'email', 'createdAt'] });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: ['id', 'email'] });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
