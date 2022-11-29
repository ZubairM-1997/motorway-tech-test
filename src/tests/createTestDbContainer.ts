import { GenericContainer, StartedTestContainer } from "testcontainers";
import path from "path";

export default async function createTestDbContainer(): Promise<StartedTestContainer> {
  return await new GenericContainer("postgres")
    .withEnvironment({
      POSTGRES_USER: "root",
      POSTGRES_PASSWORD: "password",
      POSTGRES_DB: "motorway",
    })
    .withBindMounts([
      {
        source: path.join(__dirname, "../../scripts/dump.sql"),
        target: "/docker-entrypoint-initdb.d/dump.sql",
      },
    ])
    .withExposedPorts(5432)
    .start();
}
