import pool from "../config/database.js";

export const getDashboard = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        stores.name,
        COUNT(ratings.id) AS total_ratings,
        COALESCE(ROUND(AVG(ratings.rating),1),0) AS average_rating
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      WHERE stores.owner_id = $1
      GROUP BY stores.id
      `,
      [req.user.id]
    );

    res.status(200).json({
      dashboard: result.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getStoreRatings = async (req, res) => {
  try {

    const ratings = await pool.query(
      `
      SELECT
        users.name AS user_name,
        users.email AS user_email,
        ratings.rating
      FROM ratings
      JOIN users
      ON ratings.user_id = users.id
      JOIN stores
      ON ratings.store_id = stores.id
      WHERE stores.owner_id = $1
      `,
      [req.user.id]
    );

    res.status(200).json({
      ratings: ratings.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};