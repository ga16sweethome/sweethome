const {
  Favorite,
  Showcase,
  ShowcaseType,
  Project,
  Appointment,
  ProjectDetail,
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

      const total = {};
      const find = await Showcase.findAll({ where: { id }, raw: true });

      let query = {
        where: { id, is_shown: true },
        attributes: {
          exclude: [
            "id",
            "createdAt",
            "updatedAt",
            "is_shown",
            "createdBy",
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
        ],
      };

      if (find[0].showcaseTypeId == 1) {
        query = {
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
                    {
                      model: ServiceType,
                      as: "serviceType",
                      attributes: {
                        exclude: ["id", "createdAt", "updatedAt"],
                      },
                    },
                  ],
                },
                {
                  model: ProjectDetail,
                  as: "projectDetail",
                  attributes: {
                    exclude: [
                      "id",
                      "createdAt",
                      "updatedAt",
                      "projectTypeId",
                      "sectionId",
                    ],
                  },
                },
              ],
            },
          ],
          // raw : true
        };
      }

      const data = await Showcase.findAll(query);

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

      if (find[0].showcaseTypeId == 1) {
        const price = data[0].project.projectDetail;
        let sumPrice = 0,
          sumArea = 0;
        sumWorkDuration = 0;

        for (let i = 0; i < price.length; i++) {
          sumPrice += data[0].project.projectDetail[i].price;
          total.Cost = sumPrice;
          sumArea += data[0].project.projectDetail[i].area;
          total.Area_Size = sumArea;
          sumWorkDuration += data[0].project.projectDetail[i].workDuration;
          total.RenovationDuration = sumWorkDuration;
        }
      }

      if (data.length === 0) {
        return res.status(400).json({
          status: "Bad Request",
          message: "UnAuthorized",
        });
      }
      res.status(200).json({ data, total });
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

      const data1 = await Showcase.findAndCountAll({
        where: { is_shown: true },
      });
      const jumlahPage = Math.ceil(data1.count / 8);

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

      let keywordsQuery;
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
        order: [["createdAt", "DESC"]],
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
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"],
                },
                where: {
                  name: {
                    [Op.or]: isiStyle,
                  },
                },
              },
            ],
          },
          {
            model: Project,
            as: "project",
            where: {
              ...keywordsQuery,
            },
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
                    "sectionId",
                  ],
                },
                include: [
                  {
                    model: Section,
                    as: "section",
                    where: {
                      name: {
                        [Op.or]: isiSection,
                      },
                    },
                    attributes: {
                      exclude: ["id", "createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      data = JSON.parse(JSON.stringify(data));

      for (let i = 0; i < data.length; i++) {
        if (data[i].project) {
          let totalPrice = 0,
            totalArea = 0,
            totalDuration = 0;

          for (let j = 0; j < data[i].project.projectDetail.length; j++) {
            totalPrice += data[i].project.projectDetail[j].price;
            totalArea += data[i].project.projectDetail[j].area;
            totalDuration += data[i].project.projectDetail[j].workDuration;
          }
          data[i].totalPrice = totalPrice;
          data[i].totalArea = totalArea;
          data[i].totalDuration = totalDuration;
        } else {
          data[i].totalPrice = 0;
          data[i].totalArea = 0;
          data[i].totalDuration = 0;
        }
      }

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

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
