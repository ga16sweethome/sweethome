jest.setTimeout(); //set time for jest
const app = require("../app");
const supertest = require("supertest");
const { User } = require("../models");

let token;
const data = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "affandiagung@gmail.com",
  password: "Admin123#",
};

const message = `\"password\" length must be at least 6 characters long`;

//reset table user
afterAll((done) => {
  User.sync({ force: true }).then((res) => {
    done();
  });
});

//test register failed password
test("REGISTER /api/v1/user/register", async () => {
  const datapasswordsalah = {
    firstName: "Kucing",
    lastName: "Anggora",
    email: "affandiagung@gmail.com",
    password: "admin35",
  };
  await supertest(app)
    .post("/api/v1/user/register")
    .send(datapasswordsalah)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe(
        "Your password must be at least 6 characters with minimal one Lowercase Letter,one Uppercase Letter, Number and Character"
      );
    });
});

//test register Bad Request  schema
test("REGISTER /api/v1/user/register", async () => {
  const datapasswordsalah = {
    firstName: "Kucing",
    lastName: "Anggora",
    email: "affandiagung@gmail.com",
    password: "admin",
  };
  await supertest(app)
    .post("/api/v1/user/register")
    .send(datapasswordsalah)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});

//test register success
test("REGISTER /api/v1/user/register", async () => {
  await supertest(app)
    .post("/api/v1/user/register")
    .send(data)
    .expect(201)
    .then((res) => {
      token = "Bearer " + res.body.result;
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

//test register unauthorized email already use
test("REGISTER /api/v1/user/register", async () => {
  await supertest(app)
    .post("/api/v1/user/register")
    .send({ ...data })
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test getOne sukses
test("GET USER /api/v1/user", async () => {
  await supertest(app)
    .get("/api/v1/user")
    .set("Authorization", token)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});

//test login sukses
test("LOGIN /api/v1/user/login", async () => {
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: data.email, password: data.password })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBe("Success");
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

//test login failed  bad request
test("LOGIN /api/v1/user/login", async () => {
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: data.email })
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test login  failed password tidak match
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "emailsalah@gmail.com",
    password: "Admin321#",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBe("Unauthorized");
      expect(res.body.message).toBe("Invalid email and password combination");
    });
});

//test login  failed password tidak match
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "affandiagung@gmail.com",
    password: "PasswordSalah123#",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBe("Unauthorized");
      expect(res.body.message).toBe("Incorrect Username or Password");
    });
});

//test getpicture success with query
test("GETPICTURE /api/v1/showcase/home/pic", async () => {
  await supertest(app)
    .get("/api/v1/showcase/home/pic")
    .query({ section: "Kitchen" })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBe("Success");
      expect(res.body.message).toBeTruthy();
    });
});

// //test forgot password success
test("FORGOTPASSWORD /api/v1/user/forgot", async () => {
  let cari = await User.findAll({ where: { email: data.email } });
  cari = JSON.parse(JSON.stringify(cari));

  await supertest(app)
    .post("/api/v1/user/forgot")
    .send({ email: data.email })
    // .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});
