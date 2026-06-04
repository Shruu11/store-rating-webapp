import pool from "../config/database.js";

export const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;

    // Check store exists
    const store = await pool.query(
      "SELECT * FROM stores WHERE id = $1",
      [store_id]
    );


    if (store.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }
    if (!rating || rating < 1 || rating > 5) {
  return res.status(400).json({
    message: "Rating must be between 1 and 5",
  });
}

    // Check existing rating
    const existingRating = await pool.query(
      `
      SELECT *
      FROM ratings
      WHERE user_id = $1
      AND store_id = $2
      `,
      [req.user.id, store_id]
    );

    if (existingRating.rows.length > 0) {
      return res.status(400).json({
        message: "Rating already exists",
      });
    }

    const newRating = await pool.query(
      `
      INSERT INTO ratings(user_id, store_id, rating)
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [req.user.id, store_id, rating]
    );

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;

    const updated = await pool.query(
      `
      UPDATE ratings
      SET rating = $1
      WHERE user_id = $2 AND store_id = $3
      RETURNING *
      `,
      [rating, req.user.id, storeId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }
    if (!rating || rating < 1 || rating > 5) {
  return res.status(400).json({
    message: "Rating must be between 1 and 5",
  });
}

    res.json({
      message: "Rating updated successfully",
      rating: updated.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};