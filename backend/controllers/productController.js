const { Product, Category } = require('../models');
const { Op } = require('sequelize');
const csvService = require('../services/csvService');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, categoryId, image } = req.body;
        console.log("body=>", req.body);

        const product = await Product.create({ name, price, categoryId, image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, categoryId, image } = req.body;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        if (name) product.name = name;
        if (price) product.price = price;
        if (categoryId) product.categoryId = categoryId;
        if (image) product.image = image;

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sort = 'asc' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { '$Category.name$': { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [{
                model: Category,
                as: 'Category',
                required: false
            }],
            order: [['price', sort.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            subQuery: false
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            products: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.bulkUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await csvService.processBulkUpload(req.file.path);
        res.json({ message: 'Upload processed', ...result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.generateReport = (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=products_report.csv');
        csvService.generateProductReport(res);
    } catch (error) {
        res.status(500).end();
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [{ model: Category, attributes: ['name'] }]
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
