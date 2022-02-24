const {
  Appointment,
  Timeslot,
  ServiceType,
  BuildingType,
  Section,
  Style,
  LastActivity,
  AppointmentJunkSection,
  AppointmentJunkStyle,
} = require("../models");
const errorHandler = require("../helpers/error-handler");
const joi = require("joi").extend(require("@joi/date"));

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = req.user;
      const result = await Appointment.findAll({ 
        where: { userId: data.id },
        include: [
          {
            model: BuildingType,
            as: "buildingType",
            attributes: ["name"]
          },
          {
            model: ServiceType,
            as: "serviceType",
            attributes: ["name"]
          },
          {
            model: Timeslot,
            as: "timeslot",
            attributes: ["time"]
          }
        ],
        attributes: {
            exclude: ["buildingTypeId","serviceTypeId","timeslotId","userId"]
        }
      });
      if (!result) {
        return res.status(401).json({
          message: "User Don't Have Any Appointment",
          result: {},
        });
      }
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  create: async (req, res) => {
    const body = req.body;
    const user = req.user;
    try {
      const schema = joi.object({
        buildingType: joi.string().required(),
        serviceType: joi.string().required(),
        estimateTime: joi.number().required(),
        budget: joi.number().required(),
        address: joi.string().required(),
        areaSize: joi.number().required(),
        note: joi.string().required(),
        date: joi.date().format("YYYY-MM-DD").required(),
        time: joi.string().required(),
      });
      const { error } = schema.validate({
        buildingType: body.buildingType,
        serviceType: body.serviceType,
        estimateTime: body.estimateTime,
        budget: body.budget,
        address: body.address,
        areaSize: body.areaSize,
        note: body.note,
        date: body.date,
        time: body.time,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
          result: {},
        });
      }

      const buildingType = await BuildingType.findOne({
        where: { name: body.buildingType },
      });

      const serviceType = await ServiceType.findOne({
        where: { name: body.serviceType },
      });

      const timeslot = await Timeslot.findOne({
        where: {
          time: body.time,
          serviceTypeId: serviceType.id,
        },
      });

      const doubleAppointment = await Appointment.findOne({
        where: {
          appointmentDate: body.date,
          timeslotId: timeslot.id,
        },
      });
      if (doubleAppointment)
        return res.status(401).json({
          status: "Failed Create Appointment",
          message: "Can't Create Appointment Same Date & Time",
        });

      const create = await Appointment.create({
        userId: user.id,
        buildingTypeId: buildingType.id,
        serviceTypeId: serviceType.id,
        estimateTime: body.estimateTime,
        areaSize: body.areaSize,
        budget: body.budget,
        address: body.address,
        note: body.note,
        appointmentDate: body.date,
        timeslotId: timeslot.id,
        status: 1,
      });

      let str = "" + create.id;
      let pad = "0000";
      let ans = pad.substring(0, pad.length - str.length) + str;
      let code = "#A-" + ans;
      await Appointment.update({ code }, { where: { id: create.id } });

      await LastActivity.update(
        { submitted: create.createdAt },
        { where: { userId: user.id } }
      );

      const section = await Section.findAll({ where: { name: body.sections } });
      const sectionId = section.map((el) => el.id);
      const appointmentJunkSection = [];
      for (let i = 0; i < sectionId.length; i++) {
        appointmentJunkSection.push({
          appointmentId: create.id,
          sectionId: sectionId[i],
        });
      }
      await AppointmentJunkSection.bulkCreate(appointmentJunkSection);

      const style = await Style.findAll({ where: { name: body.styles } });
      const styleId = await style.map((el) => el.id);
      const appointmentJunkStyle = [];
      for (let i = 0; i < styleId.length; i++) {
        appointmentJunkStyle.push({
          appointmentId: create.id,
          styleId: styleId[i],
        });
      }
      await AppointmentJunkStyle.bulkCreate(appointmentJunkStyle);

      const result = await Appointment.findOne({ where: { id: create.id } });
      res.status(200).json(result);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
