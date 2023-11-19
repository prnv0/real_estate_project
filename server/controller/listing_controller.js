const pool = require('../db');

const create_listing = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const { name, location, type, price_per_sqft, user_uid, image_urls, description, bedrooms, bathrooms, area_sqft, year_built } = req.body;
        const newListingQuery = `INSERT INTO listing (name, location, type, price_per_sqft, user_uid, image_urls, description, bedrooms, bathrooms, area_sqft, year_built) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        await client.query(newListingQuery, [name, location, type, price_per_sqft, user_uid, image_urls, description, bedrooms, bathrooms, area_sqft, year_built]);
        res.status(201).json({ message: 'Listing created successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = create_listing;