const {
  User,
  Gallery,
  Showcase,
  ShowcaseJunkSection,
  Section,
  PasswordReset,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const Joi = require("joi"); //use joi validation NPM
const {
  hashPassword,
  comparePassword,
  validatePassword,
} = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Op } = require("sequelize"); //use Op from Sequelize
const random = require("randomstring");
const sendMail = require("../helpers/mail-sender");

module.exports = {
  getOne: async (req, res) => {
    const data = req.user;
    try {
      const find = await User.findAll({
        where: {
          id: data.id,
        },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "is_admin", "password"],
        },
      });

      res.status(200).json(find);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const checkPassword = validatePassword(password);
      if (!checkPassword) {
        return res.status(400).json({
          status: "Failed",
          result:
            "Your password must be at least 6 characters with minimal one Lowercase Letter,one Uppercase Letter, Number and Character",
        });
      }

      const check = await User.findOne({ where: { email } });
      if (check) {
        return res.status(401).json({
          status: "Failed",
          message: "This Email Already Used",
        });
      }
      const passwordhashed = hashPassword(password);
      const data = await User.create({
        firstName,
        lastName,
        email,
        password: passwordhashed,
        is_admin: false,
      });
      if (!data) {
        return res.status(401).json({
          status: "Failed",
          message: "Failed to register",
        });
      }

      const token = generateToken({
        id: data.id,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        picture: data.picture,
        phone: data.phone,
        is_admin: false,
      });

      return res.status(201).json({
        msg: `Registrasi Success`,
        result: { token },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Invalid email and password combination",
          result: {},
        });
      }
      const checkPassword = comparePassword(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({
          message: "Incorrect Username or Password",
          status: "Unauthorized",
        });
      }
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        picture: user.picture,
        phone: user.phone,
      });
      // let token = generateToken(payload);

      res.status(200).json({
        status: "Success",
        message: "Logged in successfully",
        result: { token },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  updateProfile: async (req, res) => {
    const body = req.body;
    const file = req.file;
    const id = req.user.id;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Please Insert an Image file",
        });
      }
      // schema mengisi validasi object sbb

      const schema = Joi.object({
        phone: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        picture: Joi.string(),
        email: Joi.string().email(),
      });

      const { error } = schema.validate({
        ...body,
        picture: file.path,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const update = await User.update(
        {
          ...body,
          picture: file.path,
        },
        { where: { id } }
      );
      if (!update) {
        return res.status(400).json({
          status: "Failed",
          message: "Failed To Upload Picture",
        });
      }
      const cari = await User.findOne({
        where: { id },
        attributes: ["firstName", "lastName", "email", "phone", "picture"],
      });

      res.status(201).json({
        status: "Success",
        message: "Successfully Update Profile",
        result: cari,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getPicture: async (req, res) => {
    const { section } = req.query;
    try {
      let isiSection = "";
      if (section) {
        isiSection = {
          name: section,
        };
      }

      const data = await Showcase.findAll({
        where: {
          is_shown: true,
        },
        attributes: {
          exclude: [
            ,
            "updatedAt",
            "showcaseId",
            "projectId",
            "createdBy",
            "showcaseTypeId",
            "is_shown",
            "createdAt",
          ],
        },
        include: [
          {
            model: Gallery,
            as: "gallery",
            attributes: {
              exclude: ["createdAt", "updatedAt", "showcaseId"],
            },
          },
          {
            model: ShowcaseJunkSection,
            required: true,
            as: "showcaseJunkSection",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: Section,
                as: "section",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
                where: isiSection,
              },
            ],
          },
        ],
      });
      let x = Math.floor(Math.random() * data.length);
      console.log(x);
      res.status(200).json(data[x]);
      // console.log(data.length);
      // res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  forgotPass: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(404).json({
          status: "Bad Request",
          message: "Invalid email , user not found",
          result: [],
        });
      console.log(random.generate(50));
      const passwordReset = await PasswordReset.create({
        email,
        validationCode: random.generate(50),
        isDone: false,
      });
      sendMail(
        email,
        "Password Reset",
        `
      <h1>Password reset confirmation</h1>
      <b>Please conmfirm you passwword reset by clicking the link bellow</b>
      <h2>
      <a href="${process.env.BASEURL}/api/v1/user/forgotcode?code=${passwordReset.validationCode}">Click Here</a></h2>`
      );
      res.status(200).json({
        status: "success",
        message:
          "The email have been seent to reset your password, please check our email",
        restul: {},
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  resetPassword: async (req, res) => {
    const { validationCode, password } = req.body;
    try {
      const schema = Joi.object({
        validationCode: Joi.string().required(),
        password: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const validate = await PasswordReset.findOne({
        where: {
          validationCode,
          isDone: false,
        },
      });
      if (!validate) {
        return res.status(404).json({
          status: "Bad Request",
          message: "Invalid password confirmation",
          result: {},
        });
      }
      const pwdHas = hashPassword(password);
      await User.update(
        { password: pwdHas },
        { where: { email: validate.email } }
      );
      await PasswordReset.update(
        { isDone: true },
        { where: { validationCode } }
      );

      res.status(200).json({
        status: "Success",
        message: "Successfully change the password",
        result: {},
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
