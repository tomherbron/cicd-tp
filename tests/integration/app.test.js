const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world! without name", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return Hello world! From Alice with name", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Alice");
  });
});

describe("POST /hello", () => {
  it("should return Hello world! without header", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return Hello world! From Bob with header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Bob");
  });
});

describe("GET /hello - Edge cases", () => {
  it("should handle names with spaces (URL encoded)", async () => {
    const res = await request(app).get("/hello/John%20Doe");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From John Doe");
  });

  it("should handle empty string as name", async () => {
    const res = await request(app).get("/hello/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should handle very long names", async () => {
    const longName = "A".repeat(1000);
    const res = await request(app).get(`/hello/${longName}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`Hello world! From ${longName}`);
  });
});

describe("POST /hello - Edge cases", () => {
  it("should handle empty string in x-name header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should handle special characters in x-name header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Marie-José");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Marie-José");
  });

  it("should handle case-insensitive header names", async () => {
    const res = await request(app)
      .post("/hello")
      .set("X-Name", "Charlie");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Charlie");
  });
});
