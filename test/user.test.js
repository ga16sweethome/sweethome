const app = require("../server");
const supertest = require("supertest");
const { User } = require("../models");

const data = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "affandiagung@gmail.com",
  password: "Admin123#",
};
const datafirstNamesalah = {
  firstName: 2,
  lastName: "Anggora",
  email: "affandiagung@gmail.com",
  password: "Admin123#",
};

const dataemailsalah = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "affandiagung",
  password: "Admin123#",
};

const datapasswordsalah = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "affandiagung@gmail.com",
  password: "admin",
};

const message = `\"password\" length must be at least 6 characters long`;

//reset table user
// afterAll((done) => {
//   User.destroy({ truncate: true }).then((res) => {
//     done();
//   });
// });

//test register sukses
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

//register failed firstName salah
test("REGISTER /api/v1/user/register", async () => {
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
    .send(data)
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test login sukses
test("LOGIN /api/v1/user/login", async () => {
  let login = {
    email: "affandiagung@gmail.com",
    password: "Admin123#",
  };
  await supertest(app)
    .post("/api/v1/user/login")
    .send(login)
    .expect(200)
    .then((res) => {
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

//test getpicture success
test("GETPICTURE /api/v1/showcase/home/pic", async () => {
  await supertest(app)
    .get("/api/v1/showcase/home/pic")
    .query("Bedroom")
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
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
