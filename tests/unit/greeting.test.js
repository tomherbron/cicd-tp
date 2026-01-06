const { getGreeting } = require("../../src/greeting");

const request = require('supertest');
const app = require('../../src/server');

describe("getGreeting", () => {
  it("returns the hello world message", () => {
    expect(getGreeting()).toBe("Hello world!");
  });
});

describe('GET /hello', () => {
  it('should return a greeting with the provided name', async () => {
    const name = 'Alice';
    const response = await request(app).get(`/hello/${name}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(name);

  });

  it('should return a greeting without a name', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hey undefined');

  });

});



describe('POST /hello', () => {

  it('should return a greeting with the name from the header', async () => {
    const name = 'Bob';
    const response = await request(app)
        .post('/hello')
        .set('x-name', name);
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(name);

  });



  it('should return a greeting without the header', async () => {
    const response = await request(app).post('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hey undefined');

  });

});
