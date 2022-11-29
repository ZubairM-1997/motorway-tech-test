import { StartedTestContainer } from "testcontainers";
import App from "../app";
import createTestDbContainer from "./createTestDbContainer";
import request from "supertest";

let app: App, dbContainer: StartedTestContainer

beforeAll(async () => {
  // starts a Docker container with a postgres instance inside
  dbContainer = await createTestDbContainer();
  jest.setTimeout(30000)

  const serverConfig = {
    db: {
      port: dbContainer.getMappedPort(5432),
      host: "127.0.0.1",
      username: "root",
      password: "password",
      db_name: "motorway",
    },
  };

  app = new App(serverConfig);
  await app.init();
});

afterAll(async () => {
  jest.setTimeout(30000);
  await app?.dbClient?.close(); // disconnecting the Database Client
  await dbContainer.stop(); // Stoping the Database Container
});

describe("The api/vehicles/:vehicleId resource", () => {
  describe("When we make a GET request to the /api/vehicles/:vehicleId endpoint with valid parameters", () => {
    test("Then vehicle information returned", async () => {
      const response = await request(app.express)
        .get("/api/vehicles/1")
        .set("Content-Type", "application/json")
        .send({
          "timestamp": "2022-09-10 10:23:54+00"
        
        })
      expect(response.body.vehicleInfo.id).toEqual(1);
      expect(response.body.vehicleInfo.make).toEqual("BMW");
    });
  });

  describe("When we make a GET request to the /api/vehicles/:vehicleId endpoint with invalid vehicleId", () => {
    test("Then vehicle information returned", async () => {
      const response = await request(app.express)
        .get("/api/vehicles/ABC")
        .set("Content-Type", "application/json")
        .send({
          "timestamp": "2022-09-10 10:23:54+00"
        
        })
      expect(response.status).toBe(400);
    });
  });

  describe("When we make a GET request to the /api/vehicles/:vehicleId endpoint with no timestamp", () => {
    test("The middleware handles it successfully", async () => {
      const response = await request(app.express)
        .get("/api/vehicles/1")
        .set("Content-Type", "application/json")
        .send({})
      expect(response.body.errors).toEqual(["\"timestamp\" is required"]);
    });
  });

  describe("When we make a GET request to the /api/vehicles/:vehicleId endpoint with timestamp in incorrect format", () => {
    test("The middleware handles it successfully", async () => {
      const response = await request(app.express)
        .get("/api/vehicles/1")
        .set("Content-Type", "application/json")
        .send({
          "timestamp": 12
        })
      expect(response.body.errors).toEqual(["\"timestamp\" must be a string"]);
    });
  });
  


});

