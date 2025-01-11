import { queryDB } from "../db/database";

export const getAllUsersService = async () => {};

export const getUserByIdService = async () => {};

export const getUserByUsernameService = async (username) => {
  try {
    const result = await queryDB("SELECT * FROM users WHERE username = $1", [username]);

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching user by username: ${err.message}`);
  }
};

export const createUserService = async (username, password) => {
  try {
    const result = await queryDB(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching user by username: ${err.message}`);
  }
};

export const verifyUserService = async (username, password) => {
  try {
    const result = await queryDB("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    return {
      id: user.id,
      username: user.username
    };
  } catch (err) {
    throw new Error(`Error verifying user: ${err.message}`);
  }
};
