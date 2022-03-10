const {
  Favorite,
  Showcase,
  Project,
  Appointment,
  Gallery,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const project = require("./project");
const appointment = require("./appointment");

module.exports = {
  getAllFavoriteByUserId: async (req, res) => {
    const { id } = req.params; //klo sudah ada token ngambilnya userId dari token
    try {
      //const data = req.user // DARI TOKEN
      const data = await Favorite.findAll({
        where: { userId: req.user.id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        include: {
          model: Showcase,
          as: "showcase",
          attributes: ["name"],
          include: [
            {
              model: Gallery,
              as: "gallery",
              attributes: ["id", "title", "picture"],
            },
            {
              model: Project,
              as: "project",
              attributes: ["totalPrice", "totalArea"],
              include: [
                {
                  model: Appointment,
                  as: "appointment",
                  attributes: ["address"],
                },
              ],
            },
          ],
          attributes: {
            exclude: [
              "id",
              "createdAt",
              "updatedAt",
              "showcaseTypeId",
              "projectId",
              "is_shown",
            ],
          },
        },
      });

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  createFavorite: async (req, res) => {
    const { showcaseId } = req.params;
    const userId = req.user.id;
    try {
      const findfavorite = await Favorite.findOne({
        where: {
          showcaseId,
          userId,
        },
      });

      if (!findfavorite) {
        await Favorite.create({ userId, showcaseId });
      }

      if (findfavorite) {
        await Favorite.destroy({
          where: { id: findfavorite.id },
        });
      }

      const result = await Favorite.findOne({
        where: {
          showcaseId,
          userId,
        },
      });
      
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  deleteFavorite: async (req, res) => {
    const { showcaseId } = req.params;
    const userId = req.user.id;
    try {
      const deleteFav = await Favorite.destroy({
        where: { showcaseId, userId },
      });
      if (!deleteFav) {
        return res.status(404).json({
          status: "Not Found",
          message: "Already exclude from favourite",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Data Success Deleted",
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
