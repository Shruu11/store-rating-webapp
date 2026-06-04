import pool from "../config/database.js";

export const getAllStores = async (req, res) => {
  try {

    const stores = await pool.query(`
      SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        COALESCE(ROUND(AVG(ratings.rating), 1), 0) AS average_rating
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      GROUP BY stores.id
      ORDER BY stores.id ASC
    `);

    res.status(200).json({
      stores: stores.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};