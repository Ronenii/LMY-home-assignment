import { PostgreSqlContainer } from "@testcontainers/postgresql";

let postgresContainer;

export const startTestContainer = async () => {
  console.log("Starting Postgres Testcontainer...");

  // Initialize the container and ensure it is fully started before moving forward
  postgresContainer = await new PostgreSqlContainer().start();

  console.log(
    `Postgres Testcontainer started at: ${postgresContainer.getConnectionUri()}`
  );
};

export const stopTestContainer = async () => {
  if (postgresContainer) {
    console.log("Stopping Postgres Testcontainer...");
    await postgresContainer.stop();
    console.log("Postgres Testcontainer stopped.");
  }
};

export const getDatabaseUri = () => {
  if (!postgresContainer) {
    throw new Error(
      "PostgresContainer is not initialized. Did you call startTestContainer?"
    );
  }
  return postgresContainer.getConnectionUri();
};
