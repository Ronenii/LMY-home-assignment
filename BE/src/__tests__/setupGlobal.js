import { startTestContainer } from "./setupTestEnvironment.js";

export default async () => {
  console.log("Starting global setup...");
  await startTestContainer();
  console.log("Global setup completed.");
};
