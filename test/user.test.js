jest.setTimeout(); //set time for jest
const app = require("../app");
const supertest = require("supertest");
const { User, PasswordReset } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let token, code, tokenadmin;
const data = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "affandiagung@gmail.com",
  password: "Admin123#",
};
const dataProfile = {
  firstName: "Kucing",
  lastName: "Anggora",
  email: "kucing@gmail.com",
  password: "Admin123#",
};

const admin = {
  firstName: "admin1",
  lastName: "adminadmin",
  email: "admin1@admin.com",
  password: "Admin123#",
  is_admin: true,
};

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

//test register success untuk update profile
test("REGISTER /api/v1/user/register", async () => {
  await supertest(app)
    .post("/api/v1/user/register")
    .send(dataProfile)
    .expect(201)
    .then((res) => {
      token1 = "Bearer " + res.body.result;
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
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

//test update Profile success with all field
test("UPDATE PROFILE /api/v1/user/profile", async () => {
  await supertest(app)
    .post("/api/v1/user/profile")
    .set("Authorization", token)
    .field("phone", "08581317")
    .field("firstName", "jagoan")
    .field("lastName", "neon")
    .field("email", "affandiagung@gmail.com")
    .attach("picture", "E:/Agung/Lain2/PNG File/huruf wa.png")
    .expect(201)
    .then((res) => {
      expect(res.body.status).toBe("Success");
      expect(res.body.message).toBe("Successfully Update Profile");
      expect(res.body.result).toBeTruthy();
    });
});

//test update Profile bad request
test("UPDATE PROFILE /api/v1/user/profile", async () => {
  await supertest(app)
    .post("/api/v1/user/profile")
    .set("Authorization", token)
    .field("email", "ty78ujkg")
    .attach("picture", "E:/Agung/Lain2/PNG File/huruf wa.png")
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});

//test getpicture 404 no data found with query
test("GETPICTURE /api/v1/showcase/home/pic", async () => {
  await supertest(app)
    .get("/api/v1/showcase/home/pic")
    .query({ section: "Kitchen" })
    .expect(404)
    .then((res) => {
      expect(res.body.status).toBe("Not Found");
      expect(res.body.message).toBeTruthy();
    });
});

//test getpicture success with query
test("GETPICTURE /api/v1/showcase/home/pic", async () => {
  await supertest(app)
    .get("/api/v1/showcase/home/pic")
    .query({ section: "Bathroom" })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test forgot password success
test("FORGOTPASSWORD /api/v1/user/forgot", async () => {
  await supertest(app)
    .post("/api/v1/user/forgot")
    .send({ email: data.email })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
  code = await PasswordReset.findOne({ where: { email: data.email } });
});

//test forgot password bad request email not found
test("FORGOT PASSWORD /api/v1/user/forgot", async () => {
  await supertest(app)
    .post("/api/v1/user/forgot")
    .send({ email: "emailgada@gmail.com" })
    .expect(404)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});

//test reset password bad request email not found
test("RESET PASSWORD /api/v1/user/reset", async () => {
  await supertest(app)
    .post("/api/v1/user/reset")
    .send({ validationCode: code.validationCode })
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});

//test reset password bad request invalid password confirmation
test("RESET PASSWORD /api/v1/user/reset", async () => {
  await supertest(app)
    .post("/api/v1/user/reset")
    .send({ validationCode: "#12rghuw9", password: "Apakah123#" })
    .expect(404)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});

//test reset password success
test("RESET PASSWORD /api/v1/user/reset", async () => {
  await supertest(app)
    .post("/api/v1/user/reset")
    .send({ validationCode: code.validationCode, password: "Apakah123#" })
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test CREATE ADMIN bad reqeust schema
test("CREATE ADMIN /api/v1/user/admin", async () => {
  await User.create({
    ...admin,
    password: hashPassword(admin.password),
  });
  await supertest(app)
    .post("/api/v1/user/login")
    .send({ email: admin.email, password: admin.password })
    .then((res) => {
      tokenadmin = res.body.result.token;
    });

  await supertest(app)
    .post("/api/v1/user/admin")
    .set("Authorization", "Bearer " + tokenadmin)
    .send({ email: "admin2@gmail.com" })
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
    });
});
//test CREATE ADMIN failed password
test("CREATE ADMIN /api/v1/user/admin", async () => {
  await supertest(app)
    .post("/api/v1/user/admin")
    .set("Authorization", "Bearer " + tokenadmin)
    .send({
      email: "admin2@gmail.com",
      firstName: "admin2",
      lastName: "admin2",
      password: "passwordsalah",
    })
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBeTruthy();
    });
});

//test CREATE ADMIN success
test("CREATE ADMIN /api/v1/user/admin", async () => {
  await supertest(app)
    .post("/api/v1/user/admin")
    .set("Authorization", "Bearer " + tokenadmin)
    .send({
      email: "admin2@gmail.com",
      firstName: "admin2",
      lastName: "admin2",
      password: "Admin123#",
    })
    .expect(201)
    .then((res) => {
      expect(res.body.status).toBeTruthy();
      expect(res.body.message).toBeTruthy();
    });
});

//test CREATE ADMIN failed email already used
test("CREATE ADMIN /api/v1/user/admin", async () => {
  await supertest(app)
    .post("/api/v1/user/admin")
    .set("Authorization", "Bearer " + tokenadmin)
    .send({
      email: "admin2@gmail.com",
      firstName: "admin2",
      lastName: "admin2",
      password: "Admin123#",
    })
    .expect(401)
    .then((res) => {
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBeTruthy();
    });
});
