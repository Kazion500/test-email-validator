const { request } = require("../supertest.config");
// test async endpoint

describe("Account", function () {
  it("get accounts without error", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("success when post is fired", async () => {
    const response = await request.post("/").send({
      "name": "test",
    });
    expect(response.status).toBe(200);
  });

  it("returns 500 statusCode when post is fired", async () => {
    const response = await request.post("/").send({
      id: 4,
      name: "test",
    });
    expect(response.status).toBe(500);
  });

//   it("success response when put is fired", async () => {
//     const response = await request.put("/44").send({
//       "name": "test",
//     });
//     expect(response.status).toBe(200);
//   });

  it("returns 500 statusCode when put is fired", async () => {
    const response = await request.put("/5").send({
      id: 4,
      name: "test",
    });
    expect(response.status).toBe(500);
  });

//   it("success response when delete is fired", async () => {
//     const response = await request.delete("/24").send({});
//     expect(response.status).toBe(200);
//   });

  it("returns 500 statusCode when delete is fired", async () => {
    const response = await request.delete("/5").send({
      name: "test",
      account: "test",
    });
    expect(response.status).toBe(500);
  });
});
