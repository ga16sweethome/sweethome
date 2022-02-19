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
      if (req.user) {
        const checkfavorite = await Favorite.findAll({
          where: {
            userId: req.user.id,
            showcaseId: id,
          },
        });
        // validasi apakah checkfavorite ada isi atau tidak
        if (checkfavorite.length == 0) {
          data.push({ IsFavorite: false });
        } else {
          data.push({ IsFavorite: true });
        }
      } else {
        data.push({ IsFavorite: false });
      }

      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        result: data,
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
      console.log(is_shown);
      //validasi is_shown true / false
      if (is_shown) {
        visibility = false;
      } else {
        visibility = true;
      }
      console.log(visibility);
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
      if (files.length === 0) {
        return res.status(400).json({
          status: "Bad Request",
          message: `\"picture\" required files`,
          result: {},
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

      //create schema for Joi validate
      const schema = Joi.object({
        projectId: Joi.number().required(),
        projectTotalPrice: Joi.number().required(),
        projectTotalDuration: Joi.number().required(),
        projectAppointmentAddress: Joi.string().required(),
        projectAppointmentId: Joi.number().required(),
        name: Joi.string().required(),
        projectType: Joi.array().required().items(Joi.string().required()),
        section: Joi.array().required().items(Joi.string().required()),
        styles: Joi.array().required().items(Joi.string().required()),
        title: Joi.array().required().items(Joi.string().required()),
        picture: Joi.array(),
      });

      //
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

      const createShowcase = await Showcase.create(
        {
          name: body.name,
          showcaseTypeId: 1,
          projectId: body.projectId,
          createdBy: user.id,
          is_shown: false,
        },
        { transaction: transaction }
      );

      if (!createShowcase) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Create Showcase failed",
          result: {},
        });
      }
      const queryP = body.projectType;
      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      if (queryP) {
        const pType = await ProjectType.findAll({ where: { name: queryP } });
        //validasi jika tidak ada data ProjectType
        if (!pType) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Project Type is not found",
            result: {},
          });
        }
        const pTypeId = pType.map((el) => el.id);
        for (let i = 0; i < pTypeId.length; i++) {
          //validasi isi ProjectType.id
          if (
            pTypeId[i] === null ||
            pTypeId[i] === undefined ||
            queryP.length != pTypeId.length
          ) {
            return res.status(400).json({
              status: "Bad request",
              message: "ProjectType  is not match",
              resykt: {},
            });
          }
        }

        for (let i = 0; i < pTypeId.length; i++) {
          PTypeJunk.push({
            showcaseId: createShowcase.id,
            projectTypeId: pTypeId[i],
          });
        }
      }
      const buatJunkP = await ShowcaseJunkProjectType.bulkCreate(PTypeJunk, {
        transaction: transaction,
      });
      //validasi gagal BulkCreate SHowcaseJunkProjectType
      if (!buatJunkP) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Create ShowcaseJunkProjectType failed",
          result: {},
        });
      }

      const querySection = body.section;
      const ssJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      if (querySection) {
        const pSection = await Section.findAll({
          where: { name: querySection },
        });
        //validasi jika tidak ada data Section
        if (!pSection) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Section is not found",
            result: {},
          });
        }
        const ssId = pSection.map((el) => el.id);
        for (let i = 0; i < ssId.length; i++) {
          //validasi jika is section.id not null, not undefined  )
          if (
            ssId[i] === undefined ||
            ssId[i] === null ||
            querySection.length != ssId.length
          ) {
            return res.status(400).json({
              Status: "Bad request",
              Message: "Setion is not match",
              result: {},
            });
          }
        }

        for (let i = 0; i < pSection.length; i++) {
          ssJunk.push({
            showcaseId: createShowcase.id,
            sectionId: ssId[i],
          });
        }
      }
      const buatSSJunk = await ShowcaseJunkSection.bulkCreate(ssJunk, {
        transaction: transaction,
      });
      if (!buatSSJunk) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Create ShowcaseJunkSection failed",
          result: {},
        });
      }

      const queryS = body.styles;
      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      if (queryS) {
        const style = await Style.findAll({ where: { name: queryS } });
        if (!style) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Styles is not found",
            result: {},
          });
        }
        const styleId = style.map((el) => el.id);
        for (let i = 0; i < styleId.length; i++) {
          //validasi jika is section.id not null, not undefined  )
          if (
            styleId[i] === undefined ||
            styleId[i] === null ||
            queryS.length != styleId.length
          ) {
            return res.status(400).json({
              status: "Bad request",
              message: "Styles is not match",
              result: {},
            });
          }
        }
        for (let i = 0; i < styleId.length; i++) {
          StyleJunk.push({
            showcaseId: createShowcase.id,
            styleId: styleId[i],
          });
        }
      }
      const buatJunkS = await ShowcaseJunkStyle.bulkCreate(StyleJunk, {
        transaction: transaction,
      });
      if (!buatJunkS) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Create ShowcaseJunStylee failed",
          result: {},
        });
      }

      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery
      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }
      const buatGallery = await Gallery.bulkCreate(PGallery, {
        transaction: transaction,
      });
      if (!buatGallery) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Create Gallery failed",
          result: {},
        });
      }

      await transaction.commit();
      const result = await Showcase.findOne({
        where: { id: createShowcase.id },
      });
      if (!result) {
        return res.status(400).json({
          status: "Bad Request",
          message: "Data Not Found",
          result: {},
        });
      }
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
      if (files.length === 0) {
        return res.status(400).json({
          status: "Bad Request",
          message: `\"picture\" required files`,
          result: {},
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

      //create schema for Joi validate
      const schema = Joi.object({
        name: Joi.string().required(),
        projectType: Joi.array().required().items(Joi.string().required()),
        section: Joi.array().required().items(Joi.string().required()),
        styles: Joi.array().required().items(Joi.string().required()),
        title: Joi.array().required().items(Joi.string().required()),
        picture: Joi.array(),
      });

      //
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

      const createShowcase = await Showcase.create(
        {
          name: body.name,
          showcaseTypeId: 2,
          createdBy: user.id,
          is_shown: false,
        },
        { transaction: transaction }
      );

      if (!createShowcase) {
        return res.status(500).json({
          status: " Create Showcase failed",
          message: "Internal Server Error",
          result: {},
        });
      }
      const queryP = body.projectType;
      const PTypeJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      if (queryP) {
        const pType = await ProjectType.findAll({ where: { name: queryP } });
        //validasi jika tidak ada data ProjectType
        if (!pType) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Project Type is not found",
          });
        }
        const pTypeId = pType.map((el) => el.id);
        for (let i = 0; i < pTypeId.length; i++) {
          //validasi isi ProjectType.id
          if (
            pTypeId[i] === null ||
            pTypeId[i] === undefined ||
            queryP.length != pTypeId.length
          ) {
            return res.status(400).json({
              Status: "Bad request",
              Message: "ProjectType  is not match",
            });
          }
        }

        for (let i = 0; i < pTypeId.length; i++) {
          PTypeJunk.push({
            showcaseId: createShowcase.id,
            projectTypeId: pTypeId[i],
          });
        }
      }
      const buatJunkP = await ShowcaseJunkProjectType.bulkCreate(PTypeJunk, {
        transaction: transaction,
      });
      //validasi gagal BulkCreate SHowcaseJunkProjectType
      if (!buatJunkP) {
        return res.send("gagal");
      }

      const querySection = body.section;
      const ssJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkProjectType
      if (querySection) {
        const pSection = await Section.findAll({
          where: { name: querySection },
        });
        //validasi jika tidak ada data Section
        if (!pSection) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Section is not found",
          });
        }
        const ssId = pSection.map((el) => el.id);

        for (let i = 0; i < ssId.length; i++) {
          //validasi jika is section.id not null, not undefined  )
          if (
            ssId[i] === undefined ||
            ssId[i] === null ||
            querySection.length != ssId.length
          ) {
            return res.status(400).json({
              Status: "Bad request",
              Message: "Setion is not match",
            });
          }
        }
        for (let i = 0; i < pSection.length; i++) {
          ssJunk.push({
            showcaseId: createShowcase.id,
            sectionId: ssId[i],
          });
        }
      }
      const buatSSJunk = await ShowcaseJunkSection.bulkCreate(ssJunk, {
        transaction: transaction,
      });
      if (!buatSSJunk) {
        res.send("gagal buat section ID");
      }

      const queryS = body.styles;
      const StyleJunk = []; //untuk bulcreate ( array ) ke database ShowcaseJunkStyle
      if (queryS) {
        const style = await Style.findAll({ where: { name: queryS } });
        if (!style) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Styles is not found",
          });
        }
        const styleId = style.map((el) => el.id);
        for (let i = 0; i < styleId.length; i++) {
          //validasi jika is section.id not null, not undefined  )
          if (
            styleId[i] === undefined ||
            styleId[i] === null ||
            queryS.length != styleId.length
          ) {
            return res.status(400).json({
              Status: "Bad request",
              Message: "Styles is not match",
            });
          }
        }
        for (let i = 0; i < styleId.length; i++) {
          StyleJunk.push({
            showcaseId: createShowcase.id,
            styleId: styleId[i],
          });
        }
      }
      const buatJunkS = await ShowcaseJunkStyle.bulkCreate(StyleJunk, {
        transaction: transaction,
      });
      if (!buatJunkS) {
        res.send("gagal");
      }

      const PGallery = []; //untuk bulcreate ( array ) ke database Gallery
      for (let i = 0; i < files.length; i++) {
        PGallery.push({
          showcaseId: createShowcase.id,
          title: body.title[i],
          picture: files[i].path,
        });
      }
      const buatGallery = await Gallery.bulkCreate(PGallery, {
        transaction: transaction,
      });
      if (!buatGallery) {
        res.send("gagal");
      }

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
