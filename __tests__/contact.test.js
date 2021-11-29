const { request } = require("../supertest.config");
// test async endpoint

describe("Contact", function () {
  it("get contact without error", async () => {
    const response = await request.get("/contact");
    expect(response.status).toBe(200);
  });

  // it("success when post is fired", async () => {
  //   const response = await request.post("/contact").send({
  //     email: "test@test.com",
  //     accountId: 3,
  //     photo: 'photo.png',
  //   });
  //   expect(response.status).toBe(200);
  // });

  it("success when post is fired", async () => {
    const response = await request.post("/contact").send({
      email: "test@test.com",
      accountId: 3,
    });
    expect(response.status).toBe(400);
  });

  it("returns 404 statusCode when post is fired", async () => {
    const response = await request.post("/contact/27").send({
      email: "test@test.com",
      accountId: 3,
    });
    expect(response.status).toBe(404);
  });

  it("create folder", () => {
    
  });

  it("success response when put is fired", async () => {
    const response = await request.put("/contact/23").send({
      email: "test@test.com",
      accountId: 3,
    });
    expect(response.status).toBe(200);
  });

  // it("returns 500 statusCode when put is fired", async () => {
  //   const response = await request.put("/5").send({
  //     id: 4,
  //     email: "test",
  //   });
  //   expect(response.status).toBe(500);
  // });

  // //   it("success response when delete is fired", async () => {
  // //     const response = await request.delete("/24").send({});
  // //     expect(response.status).toBe(200);
  // //   });

  //   it("returns 500 statusCode when delete is fired", async () => {
  //     const response = await request.delete("/5").send({
  //       email: "test",
  //       account: "test",
  //     });
  //     expect(response.status).toBe(500);
  //   });
});
