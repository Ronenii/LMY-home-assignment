import { stopTestContainer } from "./setupTestEnvironment.js";

export default async () => {
  await stopTestContainer();
};
