const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const errorHandler = require("../helpers/error-handler");
const { decode } = require("jsonwebtoken");

module.exports = {
  isLogin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({
          message: "No token detected",
          status: "Unauthorized",
          result: {},
        });
      }

      token = token.replace("Bearer ", "");
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({
          message: "Token is not valid",
          status: "Unauthorized",
          result: {},
        });
      }

      const user = await User.findOne({
        where: {
          id: decoded.id,
          is_admin: false,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User is not found",
          status: "Unauthorized",
          result: {},
        });
      }

      req.user = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        is_admin: user.is_admin,
      };
      next();
    } catch (error) {
      errorHandler(res, error);
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({
          message: "No token detected",
          status: "Unauthorized",
          result: {},
        });
      }

      token = token.replace("Bearer ", "");
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({
          message: "Token is not valid",
          status: "Unauthorized",
          result: {},
        });
      }

      const user = await User.findOne({
        where: {
          id: decoded.id,
          is_admin: true,
        },
      });
      if (!user) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Please Login As Admin",
        });
      }

      req.user = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };
      next();
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
