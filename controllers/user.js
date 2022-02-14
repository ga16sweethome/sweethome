const {
  User,
  Gallery,
  Showcase,
  ShowcaseJunkSection,
  Section,
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
      const checkPassword = validatePassword(password);

      if (!checkPassword) {
        return res.status(400).json({
          status: "Failed",
          result:
            "Your password must be at least 6 characters with minimal one Lowercase Letter,one Uppercase Letter, Number and Character",
        });
      }

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const check = await User.findOne({ where: { email } });
      console.log(check);
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
      });
      if (!data) {
        return res.status(401).json({
          status: "Failed",
          message: "Failed to register",
        });
      }
      return res.status(201).json({
        msg: `Registrasi Berhasil`,
        result: "You can login now",
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
        picture: Joi.string(),
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
          phone: body.phone,
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
        attributes: {
          exclude: [
            "id",
            "createdAt",
            "updatedAt",
            "is_admin",
            "password",
            "createdAt",
            "updatedAt",
            "email",
          ],
        },
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

      console.log(isiSection);
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
      // let x = Math.floor(Math.random() * (data.length + 1));
      // console.log(x);
      // res.status(200).json(data[x]);
      console.log(data.length);
      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
