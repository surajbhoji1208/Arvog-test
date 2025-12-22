const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('json2csv');
const { Product, Category } = require('../models');

exports.processBulkUpload = async (filePath) => {
    const results = [];
    const errors = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // Process in chunks to avoid memory issues and timeouts
                // Note: For truly massive files, we should process line by line in the stream
                // But for "large" files (e.g. 10k-50k rows), chunking array is okay.
                // For production "huge" (1m+), we'd move logic to the 'data' event.

                // We will process sequentially here for simplicity and relationship integrity
                let processedCount = 0;

                for (const row of results) {
                    console.log("row=>", row);

                    try {
                        // Assume CSV headers: name, price, categoryName, image
                        const categoryName = row.categoryName;
                        let category = await Category.findOne({ where: { name: categoryName } });

                        if (!category) {
                            category = await Category.create({ name: categoryName });
                        }

                        await Product.create({
                            name: row.name,
                            price: parseFloat(row.price),
                            categoryId: category.id,
                            image: row.image || ''
                        });
                        processedCount++;
                    } catch (err) {
                        errors.push({ row, error: err.message });
                    }
                }

                fs.unlinkSync(filePath); // Cleanup
                resolve({ processedCount, errors });
            })
            .on('error', (err) => {
                fs.unlinkSync(filePath);
                reject(err);
            });
    });
};

exports.generateProductReport = (res) => {
    console.log("generateProductReport");

    const fields = ['id', 'uniqueId', 'name', 'price', 'Category.name', 'createdAt'];
    const opts = { fields };
    const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

    const input = new Transform(opts, transformOpts);
    input.pipe(res);

    // Stream data from DB
    // findAll with stream is not directly supported in all Sequelize versions easily with high performance
    // But we can use a cursor or findAndCountAll with batching.
    // For standard "large", we can query in batches.
    // Or simpler: use standard stream interface if supported by dialect config (pg-native).

    // We'll use batching for stability.
    const batchSize = 1000;
    let offset = 0;

    const processBatch = async () => {
        const products = await Product.findAll({
            include: [{ model: Category, attributes: ['name'] }],
            limit: batchSize,
            offset: offset,
            raw: true // Important for performance and flattened structure
        });

        if (products.length > 0) {
            products.forEach(p => input.push(p));
            offset += batchSize;
            processBatch();
        } else {
            input.push(null); // End stream
        }
    };

    processBatch().catch(err => {
        console.error(err);
        input.push(null);
    });
};
