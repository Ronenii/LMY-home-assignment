import { createUserService, getUserByUsernameService, verifyUserService } from "../model/userModel";
import jwt from "jsonwebtoken";

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
  const result = await getUserByUsernameService(username);

  if (result.rows.length === 0) {
    handleResponse(res, 400, `username ${username} doesn't exist`);
    return true;
  }
  return false;
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body.data;
    if (!validateUsernameAndPassword(username, password)) return;

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
  const { username, password } = req.body.data;

  if (!validateUsernameAndPassword(username, password)) return;
  if (isUsernameExists) return;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const res = await createUserService(username, hashedPassword);
    handleResponse(res, 201, "User created successfully", {
      username: res.username,
      id: res.id
    });
  } catch (err) {
    next(err);
  }
};
