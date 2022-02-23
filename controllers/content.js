const {
  ServiceType,
  BuildingType,
  Section,
  Style,
  ProjectType,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const Joi = require("joi");

module.exports = {
  getServiceType: async (req, res) => {
    try {
      const result = await ServiceType.findAll();
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  createServiceType: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({ servicetype: Joi.string().required() });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const result = await ServiceType.create({ name: body.servicetype });
      res.status(200).json({
        status: "Success",
        message: "Successfully created Service Type",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getBuildingType: async (req, res) => {
    try {
      const result = await BuildingType.findAll();
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  createBuildingType: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({ buildingtype: Joi.string().required() });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const result = await BuildingType.create({ name: body.buildingtype });
      res.status(200).json({
        status: "Success",
        message: "Successfully created Building Type",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getSection: async (req, res) => {
    try {
      const result = await Section.findAll();
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  createSection: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({ section: Joi.string().required() });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const result = await Section.create({ name: body.section });
      res.status(200).json({
        status: "Success",
        message: "Successfully created Section",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getStyle: async (req, res) => {
    try {
      const result = await Style.findAll();
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  createStyle: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({ style: Joi.string().required() });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const result = await Style.create({ name: body.style });
      res.status(200).json({
        status: "Success",
        message: "Successfully created Styles",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getprojectType: async (req, res) => {
    try {
      const result = await ProjectType.findAll();
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  createProjectType: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({ projectType: Joi.string().required() });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const result = await ProjectType.create({ name: body.projectType });
      res.status(200).json({
        status: "Success",
        message: "Successfully created Project Type",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
