import { queryDB } from "../db/database.js";

// Health Check Controller
export const healthCheck = async (req, res) => {
  let dbStatus = {
    status: "disconnected",
    error: null,
  };

  try {
    await queryDB("SELECT current_database()");
    dbStatus.status = "connected";
  } catch (err) {
    dbStatus.error = err.message;
  }

  const response = {
    server: {
      status: "OK",
    },
    database: dbStatus,
  };

  if (dbStatus.status === "connected") {
    res.status(200).json(response);
  } else {
    console.error("Health check failed:", dbStatus.error);
    res.status(500).json(response);
  }
};
