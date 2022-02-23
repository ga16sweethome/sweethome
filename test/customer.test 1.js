const app = require("../server");
const supertest = require("supertest");
const { User } = require("../models");
let id;
const { isAdmin } = require("../middlewares/userAuth");
const { getMaxListeners } = require("../server");

test("GET /api/v1/customer", async () => {
  await supertest(app)
    .get("/api/v1/customer")
    .expect(401)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});

test("GET /api/v1/customer", async () => {
  req.body.email = "yedam.mansuri@gmail.com";
  req.body.password = "admminadmin";

  await supertest(app)
    .get("/api/v1/customer")
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});
