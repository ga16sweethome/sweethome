const app = require("../app");
const supertest = require("supertest");
const { User } = require("../models");

const { hashPassword } = require("../helpers/bcrypt");
let token;

//reset table user
afterAll((done) => {
  User.sync({force : true}).then((res) => {
    done();
  });
});

//get customer success
test("GET /api/v1/customer", async () => {
  const user = {
    firstName: "admin",
    lastName: "adminadmin",
    email: "admin@admin.com",
    password: "adminadmin",
    is_admin: true,
  };
  await User.create({
    ...user,
    password: hashPassword(user.password),
  });
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: user.email, password: user.password })
    .then((res) => {
      token = res.body.result.token;
    });
  await supertest(app)
    .get("/api/v1/customer")
    .set("Authorization", "Bearer " + token)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});

//get customer success with sorting
test("GET /api/v1/customer", async () => {
  await supertest(app)
    .get("/api/v1/customer")
    .query({ order: "ASC" })
    .set("Authorization", "Bearer " + token)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

//get customer failed UnAuthorized
test("GET /api/v1/customer", async () => {
  await supertest(app)
    .get("/api/v1/customer")
    .expect(401)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});
