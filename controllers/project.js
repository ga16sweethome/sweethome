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
      const data = await Project.findAll({
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

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  uploadReceipt: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const body = req.body;
    try {
      // schema mengisi validasi object sbb

      const schema = Joi.object({
        uploadReceipt: Joi.string().required(),
        noteUploadReceipt: Joi.string().required(),
      });
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
        },
        { where: { id, userId } }
      );
      if (!update) {
        return res.status(400).json({
          status: "Failed",
          message: "Failed To Upload Receipt",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully Upload Receipt",
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
  check: async (req, res) => {
    try {
      const cari = await Project.findAll({
        where: {
          userId: {
            [Op.not]: 4,
          },
          // noteUploadReceipt : {
          //     [Op.ne]: null// "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg"
          // }
        },
      });
      res.status(200).json({ cari });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
