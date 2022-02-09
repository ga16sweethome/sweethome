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
} = require("../models");
const errorHandler = require("../helpers/error-handler");

module.exports = {
  getOneShowcase: async (req, res) => {
    const { id } = req.params;
    try {
      //const userId = req.user.id // DARI TOKEN
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

      const checkFavortis = await Favorite.findAll({
        where: {
          userId: req.user.id, //nanti dari req.user.id (token)
          showcaseId: id,
        },
      });

      let IsFavorite = true;
      if (checkFavortis.length == 0) {
        IsFavorite = false;
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
      res.status(200).json({ data, IsFavorite, total, checkFavortis });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getAllShowcase: async (req, res) => {
    try {
      //const data = req.user // DARI TOKEN
      let query = {};
      const data = await Showcase.findAll({
        where: { is_shown: true },
        order: [["id", "ASC"]],
        include: [
          {
            model: ShowcaseType,
            as: "showcaseType",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
          {
            model: Project,
            as: "project",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
        // attributes : {
        //   exclude : ["id","createdAt","updatedAt"]
        // }
      });

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
