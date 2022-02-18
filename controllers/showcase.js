const {
  ShowcaseJunkSection,
  ProjectDetail,
  Favorite,
  Showcase,
  ShowcaseType,
  Project,
  Appointment,
  ServiceType,
  Section,
  BuildingType,
  ProjectType,
  ShowcaseJunkStyle,
  ShowcaseJunkProjectType,
  Style,
  User,
  Gallery,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const { Op } = require("sequelize"); //use Op from Sequelize
const appointment = require("./appointment");
const { verifyToken } = require("../helpers/jwt");
const Joi = require("joi");
const { create } = require("./appointment");
const gallery = require("../models/gallery");

module.exports = {
  getOneShowcase: async (req, res) => {
    const { id } = req.params;
    try {
      let token = req.header("Authorization");

      if (token) {
        token = token.replace("Bearer ", "");

        const decoded = verifyToken(token);

        if (decoded) {
          const user = await User.findOne({
            where: {
              id: decoded.id,
            },
          });
          if (user) {
            req.user = {
              id: user.id,
            };
          }
        }
      }

      const find = await Showcase.findAll({ where: { id }, raw: true });

      const data = await Showcase.findAll({
        where: { id, is_shown: true },
        attributes: {
          exclude: [
            "id",
            "createdAt",
            "updatedAt",
            "createdBy",
            "is_shown",
            "showcaseTypeId",
            "projectId",
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
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt", "projectTypeId"],
            },
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt", "showcaseId"],
                },
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: Style,
                as: "style",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt", "showcaseId"],
                },
              },
            ],
          },
          {
            model: Project,
            as: "project",
            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "code",
                "userId",
                "uploadReceipt",
                "noteUploadReceipt",
                "requestCancel",
                "reasonCancel",
                "confirmPayment",
                "status",
                "completedAt",
              ],
            },
            include: [
              {
                model: Appointment,
                as: "appointment",
                attributes: {
                  exclude: [
                    "completedAt",
                    "id",
                    "createdAt",
                    "updatedAt",
                    "userId",
                    "code",
                    "status",
                    "timeslotId",
                    "appointmentDate",
                    "note",
                    "budget",
                    "estimateTime",
                    "serviceTypeId",
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
                ],
              },
            ],
          },
        ],
        // raw : true
      });

      if (data.length === 0) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Data Not Found",
        });
      }
      if (req.user) {
        // check favorite if (req.user) from token
        const checkFavortis = await Favorite.findAll({
          where: {
            userId: req.user.id, //nanti dari req.user.id (token)
            showcaseId: id,
          },
        });

        if (checkFavortis.length == 0) {
          data.push({ IsFavorite: false });
        } else {
          data.push({ IsFavorite: true });
        }
      } else {
        data.push({ IsFavorite: false });
      }

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getAllShowcase: async (req, res) => {
    let { page, section, styles, keywords } = req.query;
    try {
      let token = req.header("Authorization");

      if (token) {
        token = token.replace("Bearer ", "");
        const decoded = verifyToken(token);
        if (decoded) {
          const user = await User.findOne({
            where: {
              id: decoded.id,
            },
          });
          if (user) {
            req.user = {
              id: user.id,
            };
          }
        }
      }

      if (!page) {
        page = 1;
      }

      let isiSection = [];
      if (section) {
        isiSection = section.split(",");
      }

      let isiStyle = [];
      if (styles) {
        isiStyle = styles.split(",");
      }

      let keywordsQuery = {};
      if (keywords) {
        keywordsQuery = {
          name: {
            [Op.iLike]: `%${keywords}%`, //use where like % % clause to get title where contains the keywords
          },
        };
      }

      let data = await Showcase.findAll({
        limit: 8,
        offset: (page - 1) * 8,
        where: {
          is_shown: true,
          ...keywordsQuery,
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
          ],
        },
        order: [["id", "ASC"]],
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
            as: "showcaseJunkSection",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: Section,
                as: "section",
                required: true,
                where:
                  isiSection.length > 0
                    ? {
                        name: isiSection,
                      }
                    : {},
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
              },
            ],
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: Style,
                as: "style",
                required: true,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
                where:
                  isiStyle.length > 0
                    ? {
                        name: isiStyle,
                      }
                    : {},
              },
            ],
          },
          {
            model: Project,
            as: "project",

            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "showcaseId",
                "code",
                "userId",
                "uploadReceipt",
                "noteUploadReceipt",
                "requestCancel",
                "reasonCancel",
                "confirmPayment",
                "status",
                "completedAt",
              ],
            },
            include: [
              {
                model: Appointment,
                as: "appointment",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "id",
                    "code",
                    "userId",
                    "buildingTypeId",
                    "serviceTypeId",
                    "estimateTime",
                    "budget",
                    "note",
                    "timeslotId",
                    "appointmentDate",
                    "status",
                    "completedAt",
                  ],
                },
              },
            ],
          },
        ],
      });

      let hitung = await Showcase.count({
        distinct: true,
        where: {
          is_shown: true,
          ...keywordsQuery,
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
          ],
        },
        order: [["id", "ASC"]],
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
            as: "showcaseJunkSection",
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: Section,
                as: "section",
                required: true,
                where:
                  isiSection.length > 0
                    ? {
                        name: isiSection,
                      }
                    : {},
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
              },
            ],
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "showcaseId"],
            },
            include: [
              {
                model: Style,
                as: "style",
                required: true,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
                where:
                  isiStyle.length > 0
                    ? {
                        name: isiStyle,
                      }
                    : {},
              },
            ],
          },
          {
            model: Project,
            as: "project",

            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "showcaseId",
                "code",
                "userId",
                "uploadReceipt",
                "noteUploadReceipt",
                "requestCancel",
                "reasonCancel",
                "confirmPayment",
                "status",
                "completedAt",
              ],
            },
            include: [
              {
                model: Appointment,
                as: "appointment",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "id",
                    "code",
                    "userId",
                    "buildingTypeId",
                    "serviceTypeId",
                    "estimateTime",
                    "budget",
                    "note",
                    "timeslotId",
                    "appointmentDate",
                    "status",
                    "completedAt",
                  ],
                },
              },
            ],
          },
        ],
      });
      const jumlahPage = Math.ceil(hitung / 8);

      data = JSON.parse(JSON.stringify(data));

      let isi = [];

      if (req.user) {
        const mencari = await Favorite.findAll({
          where: { userId: req.user.id },
        });

        for (let i = 0; i < mencari.length; i++) {
          isi.push(mencari[i].showcaseId);
        }
      }
      if (isi.length === 0) {
        isi.push("");
      }

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < isi.length; j++)
          if (data[i].id === isi[j]) {
            data[i].isFavorite = true;
            break;
          } else {
            data[i].isFavorite = false;
          }
      }

      res.status(200).json({ data, jumlahPage });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getAllShowcaseAdmin: async (req, res) => {
    try {
      const cari = await Showcase.findAll({
        include: [{ model: ShowcaseType, as: "showcaseType" }],
      });
      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: cari,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  createCompletedProject: async (req, res) => {
    const body = req.body;
    const user = req.user;
    const files = req.files;
    try {
      //create schema for Joi validate
      const schema = Joi.object({
        projectId: Joi.number().required(),
        projectCode: Joi.string().required(),
        projectUserName: Joi.string().required(),
        projectUserPhone: Joi.string().required(),
        projectUserEmail: Joi.string().email().required(),
        projectTotalPrice: Joi.number().required(),
        projectTotalDuration: Joi.number().required(),
        projectAppointmentAddress: Joi.string().required(),
        projectAppointmentCode: Joi.number().required(),
        name: Joi.string().required(),
        projectType: Joi.array().required().items(Joi.string().required()),
        styles: Joi.array().required().items(Joi.string().required()),
        picture: Joi.string().required(),
      });
      //validate input with Joi
      const { error } = schema.validate({
        ...body,
        picture: files.path,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }

      const createShowcase = await Showcase.create({
        name: body.name,
        showcaseTypeId: 1,
        projectId: body.projectId,
        createdBy: user.id,
        is_shown: false,
      });
      const queryP = body.projectType;
      const queryS = body.styles;

      const pType = await ProjectType.findAll({ where: { name: queryP } });
      const pTypeId = pType.map((el) => el.id);
      const style = await Style.findAll({ where: { name: queryS } });
      const styleId = style.map((el) => el.id);

      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      for (let i = 0; i < pTypeId.length; i++) {
        PTypeJunk.push({
          showcaseId: createShowcase.id,
          projectTypeId: pTypeId[i],
        });
      }
      await ShowcaseJunkProjectType.bulkCreate(PTypeJunk);

      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      for (let i = 0; i < styleId.length; i++) {
        StyleJunk.push({
          showcaseId: createShowcase.id,
          styleId: styleId[i],
        });
      }
      await ShowcaseJunkStyle.bulkCreate(StyleJunk);

      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery

      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }

      await Gallery.bulkCreate(PGallery);
      const result = await Showcase.findAll({
        where: {
          id: createShowcase.id,
        },
        include: [
          {
            model: Gallery,
            as: "gallery",
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            include: [
              {
                model: ProjectType,
                as: "projectType",
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            include: [
              {
                model: Style,
                as: "style",
              },
            ],
          },
        ],
      });
      res.status(200).json({
        status: "Succes",
        message: "Successfully created Showcase Completed Project",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  createPortfolio: async (req, res) => {
    const body = req.body;
    const user = req.user;
    const files = req.files;
    try {
      //check is file is include
      if (!files) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Please Insert an Image file",
        });
      }

      //validate input with Joi
      // const schema = Joi.object({
      //   name: Joi.string().required(),
      //   projectType: Joi.array().required().items(Joi.string()),
      //   styles: Joi.array().required().items(Joi.string()),
      //   picture: Joi.array().required().items(Joi.string()),
      //   title: Joi.array().required().items(Joi.string().required()),
      // });

      // const { error } = schema.validate({
      //   ...body,
      //   picture: files.path,
      // });

      // //if error while validation
      // if (error) {
      //   return res.status(400).json({
      //     status: "Bad Request",
      //     message: error.message,
      //   });
      // }

      const createShowcase = await Showcase.create({
        name: body.name,
        showcaseTypeId: 2,
        createdBy: user.id,
      });
      const queryP = body.projectType;
      const queryS = body.styles;

      const pType = await ProjectType.findAll({ where: { name: queryP } });
      const pTypeId = pType.map((el) => el.id);
      const style = await Style.findAll({ where: { name: queryS } });
      const styleId = style.map((el) => el.id);

      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      for (let i = 0; i < pTypeId.length; i++) {
        PTypeJunk.push({
          showcaseId: createShowcase.id,
          projectTypeId: pTypeId[i],
        });
      }
      await ShowcaseJunkProjectType.bulkCreate(PTypeJunk);

      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      for (let i = 0; i < styleId.length; i++) {
        StyleJunk.push({
          showcaseId: createShowcase.id,
          styleId: styleId[i],
        });
      }
      await ShowcaseJunkStyle.bulkCreate(StyleJunk);

      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery
      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }

      await Gallery.bulkCreate(PGallery);

      const result = await Showcase.findAll({
        where: {
          id: createShowcase.id,
        },
        include: [
          {
            model: Gallery,
            as: "gallery",
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            include: [
              {
                model: ProjectType,
                as: "projectType",
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            include: [
              {
                model: Style,
                as: "style",
              },
            ],
          },
        ],
      });

      res.status(200).json({
        status: "Succes",
        message: "Successfully created Showcase Protfolio",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getDetailProjectByAdmin: async (req, res) => {
    const { id } = req.params;
    try {
      const cari = await Project.findByPk(id, {
        include: [
          {
            model: ProjectDetail,
            as: "projectDetail",
            include: [
              {
                model: Section,
                as: "section",
              },
              { model: ProjectType, as: "projectType" },
            ],
          },
          {
            model: Appointment,
            as: "appointment",
            include: [
              {
                model: User,
                as: "user",
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt", "password"],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json({
        status: "",
        message: "",
        result: cari,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getListProject: async (req, res) => {
    try {
      let cari = await Project.findAll({
        order: [["id", "ASC"]],
        include: {
          model: User,
          as: "user",
        },
      });
      cari = JSON.parse(JSON.stringify(cari));

      let result = [];

      for (let i = 0; i < cari.length; i++) {
        result.push({
          code: cari[i].code,
          name: `${cari[i].user.firstName} ${cari[i].user.firstName}`,
          id: cari[i].id,
        });
      }

      res.status(200).json({
        status: "Succes",
        message: "Successfully retreive the data",
        result: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  shownShowcase: async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const { is_shown } = req.body;
    try {
      const check = await Showcase.findByPk(id);
      let visibility;
      const schema = Joi.object({
        is_shown: Joi.boolean().required(),
      });
      const { error } = schema.validate({
        is_shown,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      if (is_shown) {
        visibility = false;
      } else {
        visibility = true;
      }

      const update = await Showcase.update(
        { is_shown: visibility },
        {
          where: {
            createdBy: user.id,
            id,
          },
        }
      );
      if (!update[0]) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Youre not allowed to update the data",
          result: {},
        });
      }
      let shown = { is_shown: visibility };
      res.status(201).json({
        status: "Succes",
        message: "Successfully change the visibility",
        result: { shown },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
