const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("should return Hello world! without name", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("should return Hello world! From Alice with name", async () => {
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Alice");
  });
});

describe("E2E POST /hello", () => {
  it("should return Hello world! without header", async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("should return Hello world! From Bob with header", async () => {
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { "x-name": "Bob" }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Bob");
  });
});

describe("E2E GET /hello - Edge cases", () => {
  it("should handle names with special characters", async () => {
    const res = await axios.get(`${baseURL}/hello/Jean-François`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Jean-François");
  });

  it("should handle names with spaces (URL encoded)", async () => {
    const res = await axios.get(`${baseURL}/hello/John%20Doe`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From John Doe");
  });

  it("should handle empty string as name", async () => {
    const res = await axios.get(`${baseURL}/hello/`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });
});
