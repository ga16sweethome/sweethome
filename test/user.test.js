jest.setTimeout(); //set time for jest
const app = require("../app");
const supertest = require("supertest");
const { User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { verifyToken } = require("../helpers/jwt");

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

//test register success
test("REGISTER /api/v1/user/register", async () => {
  await supertest(app)
    .post("/api/v1/user/register")
    .send(data)
    .expect(201)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

//test getOne sukses
test("REGISTER /api/v1/user", async () => {
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: data.email, password: data.password })
    .then((res) => {
      token = res.body.result.token;
    });

  await supertest(app)
    .get("/api/v1/user")
    .set("Authorization", "Bearer " + token)
    // .expect(200)
    .then((res) => {
      console.log(res.body);
      expect(res.body.message).toBeTruthy();
      expect(res.body.status).toBeTruthy();
    });
});

//register failed firstName salah
test("REGISTER /api/v1/user/register", async () => {
  const datafirstNamesalah = {
    firstName: 2,
    lastName: "Anggora",
    email: "affandiagung@gmail.com",
    password: "Admin123#",
  };
  await supertest(app)
    .post("/api/v1/user/register")
    .send(datafirstNamesalah)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test register failed email
test("REGISTER /api/v1/user/register", async () => {
  const dataemailsalah = {
    firstName: "Kucing",
    lastName: "Anggora",
    email: "affandiagung",
    password: "Admin123#",
  };
  await supertest(app)
    .post("/api/v1/user/register")
    .send(dataemailsalah)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test register failed password
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
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBe(message);
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

//test login sukses
test("LOGIN /api/v1/user/login", async () => {
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: data.email, password: data.password })
    .expect(200)
    .then((res) => {
      token = res.body.result.token;
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

//test login failed format email salah
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "email salah",
    password: "Admin123#",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test login failed password tidak ada
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "affandiagung@gmail.com",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test login failed email tidak ada
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "emalgada@gmail.com",
    password: "Admin123#",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test login  failed password tidak match
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "affandiagung@gmail.com",
    password: "password salah",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test getpicture success with query
test("GETPICTURE /api/v1/showcase/home/pic", async () => {
  await supertest(app)
    .get("/api/v1/showcase/home/pic")
    .query({ section: "Bedroom" })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      // expect(res.body.result).toBeTruthy();
    });
});

// //test forgot password success
// test("FORGOTPASSWORD /api/v1/user/forgot", async () => {
//   let dataemail = { email: "affandiagung@gmail.com" };
//   await supertest(app)
//     .post("/api/v1/user/forgot")
//     .send(dataemail)
//     .expect(200)
//     .then((res) => {
//       expect(res.body.status).toBeTruthy();
//       expect(res.body.message).toBeTruthy();
//       expect(res.body.result).toBeTruthy();
//     });
// });
