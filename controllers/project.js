const {
  Project,
  Appointment,
  Timeslot,
  BuildingType,
  ProjectDetail,
  ProjectType,
  Section,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const Joi = require("joi");
const { Op } = require("sequelize");

module.exports = {
  getAllProjectByUser: async (req, res) => {
    try {
      let data = await Project.findAll({
        where: { userId: req.user.id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProjectDetail,
            as: "projectDetail",
            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "projectTypeId",
                "projectId",
              ],
            },
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt"],
                },
              },
              {
                model: Section,
                as: "section",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Appointment,
            as: "appointment",
            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "note",
                "",
                "budget",
                "serviceTypeId",
                "estimateTime",
                "completedAt",
                "timeslotId",
                "buildingTypeId",
              ],
            },
            include: [
              {
                model: BuildingType,
                as: "buildingType",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt"],
                },
              },
              {
                model: Timeslot,
                as: "timeslot",
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "budget",
                    "serviceTypeId",
                    "quota",
                  ],
                },
              },
            ],
          },
        ],
      });

      data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        data[i].status === 1
          ? (data[i].statusName = "Waiting Payment")
          : data[i].status === 2
          ? (data[i].statusName = "On Going")
          : data[i].status === 3
          ? (data[i].statusName = "Done")
          : data[i].status === -1
          ? (data[i].statusName = "Cancel")
          : "";
      }

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  uploadReceiptClient: async (req, res) => {
    const body = req.body;
    const file = req.file;
    const { id } = req.params;
    const userId = req.user.id;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Please Insert an Image file",
        });
      }
      // schema mengisi validasi object sbb

      const schema = Joi.object({
        uploadReceipt: Joi.string().required(),
        noteUploadReceipt: Joi.string().required(),
      });
      console.log(body);
      const { error } = schema.validate({
        ...body,
        uploadReceipt: file.path,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const update = await Project.update(
        {
          ...body,
          uploadReceipt: file.path,
        },
        { where: { id, userId } }
      );
      if (!update) {
        return res.status(400).json({
          status: "Failed",
          message: "Failed To Upload Receipt",
        });
      }
      const cari = await Project.findOne({
        where: {
          id,
          userId,
        },
      });
      res.status(201).json({
        status: "Success",
        message: "Successfully Upload Receipt",
        result: cari,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  requestCancelProject: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const body = req.body;
    try {
      // schema mengisi validasi object sbb

      const schema = Joi.object({
        reasonCancel: Joi.string().required(),
      });
      let requestCancel = "user";
      const { error } = schema.validate({
        ...body,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const update = await Project.update(
        {
          ...body,
          status: -1,
          requestCancel: requestCancel,
        },
        {
          where: {
            id,
            userId,
            status: {
              [Op.not]: 3,
            },
          },
        }
      );

      if (update[0] === 0) {
        return res.status(400).json({
          status: "Failed",
          message: "Request Cancel Failed",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully Cancel Project",
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
