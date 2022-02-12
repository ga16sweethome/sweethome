const { User, Showcase } = require("../models")
const errorHandler = require("../helpers/error-handler") 
const section = require("../models/section")

module.exports = {
    getOne: async (req, res) => {
        try {
            const data = await User.findOne({where:1})
            const result = {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                picture: data.picture
            }

            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },
    getPicture: async (req, res) => {
        const {section} = req.params
        try {
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
                              name: section,
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
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}