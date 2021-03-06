const {
  ShowcaseJunkSection,
  ProjectDetail,
  Favorite,
  Showcase,
  ShowcaseType,
  Project,
  Appointment,
  Section,
  BuildingType,
  ProjectType,
  ShowcaseJunkStyle,
  ShowcaseJunkProjectType,
  Style,
  User,
  Gallery,
  sequelize,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const { Op } = require("sequelize"); //use Op from Sequelize
const { verifyToken } = require("../helpers/jwt");
const Joi = require("joi");

module.exports = {
  getOneShowcase: async (req, res) => {
    const { id } = req.params;
    let token = req.header("Authorization");
    try {
      //validasi apakah ada token atau tidak
      if (token) {
        token = token.replace("Bearer ", "");
        const decoded = verifyToken(token);

        //validasi apakah decoded token berhasil
        if (decoded) {
          const user = await User.findOne({
            where: { id: decoded.id },
            attributes: ["id"],
          });

          //apakah pencarian user berdasarkan token ada di database
          if (user) {
            req.user = { id: user.id };
          }
        }
      }

      const data = await Showcase.findAll({
        where: { id, is_shown: true },
        attributes: ["id", "name"],
        include: [
          {
            model: Gallery,
            as: "gallery",
            attributes: ["title", "picture"],
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            attributes: ["showcaseId"],
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: ["name"],
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            attributes: ["showcaseId"],
            include: [
              {
                model: Style,
                as: "style",
                attributes: ["name"],
              },
            ],
          },
          {
            model: Project,
            as: "project",
            attributes: [
              "appointmentId",
              "totalPrice",
              "totalArea",
              "totalDuration",
            ],
            include: [
              {
                model: Appointment,
                as: "appointment",
                attributes: ["address"],
                include: [
                  {
                    model: BuildingType,
                    as: "buildingType",
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
      });

      //validasi jika data yg dicari tidak ada
      if (data.length === 0) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Data Not Found",
        });
      }
      // check favorite jika ada req.user from token
      let checkfavorite = "";
      if (req.user) {
        checkfavorite = await Favorite.findOne({
          where: {
            userId: req.user.id,
            showcaseId: id,
          },
        });
      }
      // validasi apakah checkfavorite ada isi atau tidak
      if (checkfavorite) {
        data.push({ IsFavorite: true });
      } else {
        data.push({ IsFavorite: false });
      }

      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        data: data,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllShowcase: async (req, res) => {
    let { page, section, styles, keywords } = req.query;
    try {
      let token = req.header("Authorization");

      //validasi jika token ada isinya
      if (token) {
        token = token.replace("Bearer ", "");
        const decoded = verifyToken(token);

        //validasi apakah decoded token berhasil
        if (decoded) {
          const user = await User.findOne({ where: { id: decoded.id } });
          //validasi apakah pencarian user berdasarkan token ada di database
          if (user) {
            req.user = { id: user.id };
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
        attributes: ["id", "name", "createdAt"],
        order: [["id", "ASC"]],
        include: [
          {
            model: Gallery,
            as: "gallery",
            attributes: ["title", "picture"],
          },
          {
            model: ShowcaseJunkSection,
            as: "showcaseJunkSection",
            attributes: ["id"],
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
                attributes: ["name"],
              },
            ],
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
            attributes: ["id"],
            include: [
              {
                model: ProjectType,
                as: "projectType",
                attributes: ["name"],
              },
            ],
          },
          {
            model: ShowcaseJunkStyle,
            as: "showcaseJunkstyle",
            attributes: ["id"],
            include: [
              {
                model: Style,
                as: "style",
                required: true,
                attributes: ["name"],
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

            attributes: [
              "appointmentId",
              "totalPrice",
              "totalArea",
              "totalDuration",
            ],
            include: [
              {
                model: Appointment,
                as: "appointment",
                attributes: ["address"],
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

        order: [["id", "ASC"]],
        include: [
          {
            model: Gallery,
            as: "gallery",
          },
          {
            model: ShowcaseJunkSection,
            as: "showcaseJunkSection",
            required: true,

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
              },
            ],
          },
          {
            model: ShowcaseJunkProjectType,
            as: "showcaseJunkProjectType",
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
            include: [
              {
                model: Style,
                as: "style",
                required: true,
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
            include: [
              {
                model: Appointment,
                as: "appointment",
              },
            ],
          },
        ],
      });
      const jumlahPage = Math.ceil(hitung / 8);
      //ngerubah jadi data array
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
      //sort data agar isFavorite diatas
      data.sort((a, b) =>
        b.isFavorite > a.isFavorite ? 1 : a.isFavorite > b.isFavorite ? -1 : 0
      );

      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        result: data,
        jumlahPage,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllShowcaseAdmin: async (req, res) => {
    let { sort } = req.query;
    try {
      const cari = await Showcase.findAll({
        include: [{ model: ShowcaseType, as: "showcaseType" }],
        order: [
          [
            "createdAt",
            sort === "DESC" ? "DESC" : sort === "ASC" ? "ASC" : "DESC",
          ],
        ],
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
  getDetailProjectByAdmin: async (req, res) => {
    const { id } = req.params;
    try {
      const cari = await Project.findOne({
        where: {
          id,
          status: 3,
        },
        attributes: ["id", "code", "totalPrice", "totalDuration"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstName", "lastName", "email", "picture", "phone"],
          },
          {
            model: ProjectDetail,
            as: "projectDetail",
            attributes: ["id"],
            include: [
              { model: Section, as: "section", attributes: ["name"] },
              { model: ProjectType, as: "projectType", attributes: ["name"] },
            ],
          },
          {
            model: Appointment,
            as: "appointment",
            attributes: ["address"],
            include: [],
          },
        ],
      });

      if (!cari) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Cant retrieve project thats not completed",
          result: {},
        });
      }

      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        result: cari,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getListProject: async (req, res) => {
    try {
      const cari = await Project.findAll({
        where: {
          status: 3,
        },
        order: [["id", "ASC"]],
        attributes: ["id", "code"],
        include: {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
      });

      res.status(200).json({
        status: "Succes",
        message: "Successfully retreive the data",
        result: cari,
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
      //create schema Joi
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

      //validasi is_shown true / false
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
        result: shown,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  createCompletedProject: async (req, res) => {
    const body = req.body;
    const user = req.user;
    const files = req.files;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      //validasi apakah filesnya ada atau tidak
      if (files.length === 0 || !files) {
        return res.status(400).json({
          status: "Bad Request",
          message: `\"picture\" required files`,
          result: {},
        });
      }

      //create schema for Joi validate
      const schema = Joi.object({
        name: Joi.string().required(),
        projectId: Joi.number().required(),
        projectType: Joi.array().required().items(Joi.string().required()),
        section: Joi.array().required().items(Joi.string().required()),
        styles: Joi.array().required().items(Joi.string().required()),
        title: Joi.array().required().items(Joi.string().required()),
        picture: Joi.array(),
      });

      //validasi body dan files
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
      // validasi title array  =  files array
      if (body.title.length != files.length) {
        return res.status(400).json({
          status: "Bad Request",
          message: "please fill all the data that required",
          result: {},
        });
      }

      const createShowcase = await Showcase.create(
        {
          name: body.name,
          projectId: body.projectId,
          showcaseTypeId: 1,
          createdBy: user.id,
          is_shown: false,
        },
        { transaction }
      );

      const querySection = body.section;
      const queryP = body.projectType;
      const queryS = body.styles;
      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      const ssJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery

      const pType = await ProjectType.findAll({ where: { name: queryP } });
      const pTypeId = pType.map((el) => el.id);
      for (let i = 0; i < pTypeId.length; i++) {
        PTypeJunk.push({
          showcaseId: createShowcase.id,
          projectTypeId: pTypeId[i],
        });
      }
      await ShowcaseJunkProjectType.bulkCreate(PTypeJunk, { transaction });

      const ss = await Section.findAll({ where: { name: querySection } });
      const ssId = ss.map((el) => el.id);
      for (let i = 0; i < ss.length; i++) {
        ssJunk.push({
          showcaseId: createShowcase.id,
          sectionId: ssId[i],
        });
      }
      await ShowcaseJunkSection.bulkCreate(ssJunk, { transaction });

      const style = await Style.findAll({ where: { name: queryS } });
      const styleId = style.map((el) => el.id);
      for (let i = 0; i < styleId.length; i++) {
        StyleJunk.push({
          showcaseId: createShowcase.id,
          styleId: styleId[i],
        });
      }
      await ShowcaseJunkStyle.bulkCreate(StyleJunk, { transaction });

      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }
      await Gallery.bulkCreate(PGallery, { transaction });

      await transaction.commit();
      const result = await Showcase.findOne({
        where: {
          id: createShowcase.id,
        },
      });
      res.status(200).json({
        status: "Succes",
        message: "Successfully created Showcase Completed Project",
        result: result,
      });
    } catch (error) {
      if (transaction) transaction.rollback();
      errorHandler(res, error);
    }
  },
  createPortfolio: async (req, res) => {
    const body = req.body;
    const user = req.user;
    const files = req.files;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      //validasi apakah filesnya ada atau tidak
      if (files.length === 0 || !files) {
        return res.status(400).json({
          status: "Bad Request",
          message: `\"picture\" required files`,
          result: {},
        });
      }

      //create schema for Joi validate
      const schema = Joi.object({
        name: Joi.string().required(),
        projectType: Joi.array().required().items(Joi.string().required()),
        section: Joi.array().required().items(Joi.string().required()),
        styles: Joi.array().required().items(Joi.string().required()),
        title: Joi.array().required().items(Joi.string().required()),
        picture: Joi.array(),
      });

      //validasi body dan files
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
      // validasi title array  =  files array
      if (body.title.length != files.length) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Please fill all the data that required",
          result: {},
        });
      }

      const createShowcase = await Showcase.create(
        {
          name: body.name,
          showcaseTypeId: 2,
          createdBy: user.id,
          is_shown: false,
        },
        { transaction }
      );

      const querySection = body.section;
      const queryP = body.projectType;
      const queryS = body.styles;
      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      const ssJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery

      const pType = await ProjectType.findAll({ where: { name: queryP } });
      const pTypeId = pType.map((el) => el.id);
      for (let i = 0; i < pTypeId.length; i++) {
        PTypeJunk.push({
          showcaseId: createShowcase.id,
          projectTypeId: pTypeId[i],
        });
      }
      await ShowcaseJunkProjectType.bulkCreate(PTypeJunk, { transaction });

      const ss = await Section.findAll({ where: { name: querySection } });
      const ssId = ss.map((el) => el.id);
      for (let i = 0; i < ss.length; i++) {
        ssJunk.push({
          showcaseId: createShowcase.id,
          sectionId: ssId[i],
        });
      }
      await ShowcaseJunkSection.bulkCreate(ssJunk, { transaction });

      const style = await Style.findAll({ where: { name: queryS } });
      const styleId = style.map((el) => el.id);
      for (let i = 0; i < styleId.length; i++) {
        StyleJunk.push({
          showcaseId: createShowcase.id,
          styleId: styleId[i],
        });
      }
      await ShowcaseJunkStyle.bulkCreate(StyleJunk, { transaction });

      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }
      await Gallery.bulkCreate(PGallery, { transaction });

      await transaction.commit();
      const result = await Showcase.findOne({
        where: {
          id: createShowcase.id,
        },
      });
      res.status(200).json({
        status: "Succes",
        message: "Successfully created Showcase Portfolio",
        result: result,
      });
    } catch (error) {
      if (transaction) transaction.rollback();
      errorHandler(res, error);
    }
  },
};
