import {
  createUserService,
  getUserByUsernameService,
  verifyUserService
} from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

const validateUsernameAndPassword = (res, username, password) => {
  if (!username || !password) {
    handleResponse(res, 400, `username and passwords are required`);
    return false;
  }
  return true;
};
const isUsernameExists = async (res, username) => {
  const user = await getUserByUsernameService(username);

  if (user) {
    handleResponse(res, 400, `username ${username} doesn't exist`);
    return true;
  }
  return false;
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!validateUsernameAndPassword(res, username, password)) return;

    const user = await verifyUserService(username, password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    handleResponse(res, 200, "Login successful", { token });
  } catch (err) {
    handleResponse(res, 401, err.message);
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!validateUsernameAndPassword(res, username, password)) return;
  if (await isUsernameExists(res, username)) return;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUserService(username, hashedPassword);
    handleResponse(res, 201, "User created successfully", {
      username: user.username,
      id: user.id
    });
  } catch (err) {
    next(err);
  }
};
