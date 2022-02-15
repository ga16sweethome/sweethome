const { date } = require("joi");
const errorHandler = require("../helpers/error-handler");

const {
  Appointment,
  ServiceType,
  AppointmentJunkSection,
  Section,
} = require("../models");
const { Op } = require("sequelize"); //use Op from Sequelize
const moment = require("moment"); //use moment npm

module.exports = {
  getAllAppointment: async (req, res) => {
    try {
      let data = await Appointment.findAll({
        include: {
          model: AppointmentJunkSection,
          as: "appointmentJunkSection",
          include: [
            {
              model: Section,
              as: "section",
            },
          ],
        },
      });
      data = JSON.parse(JSON.stringify(data));
      const cariBulan = moment(new Date()).format("YYYY-MM-DD");
      // const bulan = cariBulan.split("-")[1];
      const bulan = "01";
      const dataBulanIni = data.filter(
        (e) => e.appointmentDate.split("-")[1] === bulan
      );
      const totalData = dataBulanIni.length;
      const dataReject = dataBulanIni.filter((e) => e.status === -1);
      const dataScheduled = dataBulanIni.filter((e) => e.status === -2);
      const dataDone = dataBulanIni.filter((e) => e.status === 3);
      const dataWait = dataBulanIni.filter((e) => e.status === 1);
      // console.log(
      //   dataReject.length,
      //   dataScheduled.length,
      //   dataDone.length,
      //   dataWait.length
      // );
      let dataAppointment = {
        AppointmentRejected: dataReject.length,
        AppointmentScheduled: dataScheduled.length,
        AppointmentDone: dataDone.length,
        AppointmentWait: dataWait.length,
      };

      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: { dataAppointment },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllCountAppointment: async (req, res) => {
    try {
      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: {},
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllCountProject: async (req, res) => {
    try {
      const datae = moment(new Date()).format("YYYY-MM-DD");
      const baru = datae.split("-")[1];
      console.log(baru);
      return res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: {},
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
