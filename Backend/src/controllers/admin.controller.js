import bcrypt from "bcryptjs";
import pool from "../config/database.js";

export const getDashboard = async (req, res) => {
  try {
    // Total Users
    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    // Total Stores
    const storesResult = await pool.query(
      "SELECT COUNT(*) FROM stores"
    );

    // Total Ratings
    const ratingsResult = await pool.query(
      "SELECT COUNT(*) FROM ratings"
    );

    res.status(200).json({
      totalUsers: Number(usersResult.rows[0].count),
      totalStores: Number(storesResult.rows[0].count),
      totalRatings: Number(ratingsResult.rows[0].count),
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
      `
      INSERT INTO users
      (name,email,password,address,role)
      VALUES($1,$2,$3,$4,$5)
      RETURNING id,name,email,address,role
      `,
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({
      message: "User created successfully",
      user: user.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {

    const { name, email, role } = req.query;

    let query = `
      SELECT
      id,
      name,
      email,
      address,
      role,
      created_at
      FROM users
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (name) {
      query += ` AND name ILIKE $${index++}`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND email ILIKE $${index++}`;
      values.push(`%${email}%`);
    }

    if (role) {
      query += ` AND role = $${index++}`;
      values.push(role);
    }

    query += ` ORDER BY id ASC`;

    const users = await pool.query(query, values);

    res.json({
      users: users.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    // Check if store already exists
    const existingStore = await pool.query(
      "SELECT * FROM stores WHERE email = $1",
      [email]
    );

    if (existingStore.rows.length > 0) {
      return res.status(400).json({
        message: "Store already exists",
      });
    }

    // Verify owner exists and is STORE_OWNER
    const owner = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'STORE_OWNER'",
      [owner_id]
    );

    if (owner.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid Store Owner",
      });
    }

    const store = await pool.query(
      `
      INSERT INTO stores(name,email,address,owner_id)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [name, email, address, owner_id]
    );

    res.status(201).json({
      message: "Store created successfully",
      store: store.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// export const getStores = async (req, res) => {
//   try {

//     const stores = await pool.query(`
//       SELECT
//         stores.id,
//         stores.name,
//         stores.email,
//         stores.address,
//         users.name AS owner_name
//       FROM stores
//       LEFT JOIN users
//       ON stores.owner_id = users.id
//       ORDER BY stores.id ASC
//     `);

//     res.status(200).json({
//       stores: stores.rows,
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

export const getStores = async (req, res) => {
  try {

    const { name, email, address } = req.query;

    let query = `
      SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        users.name AS owner_name
      FROM stores
      LEFT JOIN users
      ON stores.owner_id = users.id
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (name) {
      query += ` AND stores.name ILIKE $${index++}`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND stores.email ILIKE $${index++}`;
      values.push(`%${email}%`);
    }

    if (address) {
      query += ` AND stores.address ILIKE $${index++}`;
      values.push(`%${address}%`);
    }

    query += ` ORDER BY stores.id ASC`;

    const stores = await pool.query(query, values);

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

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let userData = user.rows[0];

    if (userData.role === "STORE_OWNER") {

      const rating = await pool.query(
        `
        SELECT
        ROUND(AVG(ratings.rating),2)
        AS average_rating

        FROM stores

        LEFT JOIN ratings
        ON stores.id = ratings.store_id

        WHERE stores.owner_id = $1
        `,
        [id]
      );

      userData.averageRating =
        rating.rows[0].average_rating || 0;
    }

    res.status(200).json(userData);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};