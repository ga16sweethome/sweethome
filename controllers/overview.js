// const { date } = require("joi");
const errorHandler = require("../helpers/error-handler");

const {
  Appointment,
  Style,
  AppointmentJunkStyle,
  Section,
  AppointmentJunkSection,
  Project,
} = require("../models");
const { Op } = require("sequelize"); //use Op from Sequelize
const moment = require("moment"); //use moment npm

module.exports = {
  getAllAppointment: async (req, res) => {
    try {
      let start = moment().tz("UTC").startOf("days").toDate();
      let end = moment()
        .tz("UTC")
        .endOf("days")
        .add(2, "days")
        .add(7, "hours")
        .toDate();
      let TODAY = moment(new Date()).format("YYYY-MM-DD");
      let besok = moment(new Date())
        .add(1, "days")
        .add(7, "hours")
        .format("YYYY-MM-DD");
      let lusa = moment(new Date())
        .add(2, "days")
        .add(7, "hours")
        .format("YYYY-MM-DD");

      let cari = await Appointment.findAll({
        where: {
          appointmentDate: {
            [Op.between]: [start, end],
          },
        },
        order: [["appointmentDate", "ASC"]],
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        include: [
          {
            model: AppointmentJunkSection,
            as: "appointmentJunkSection",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            include: [
              {
                model: Section,
                as: "section",
                attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              },
            ],
          },
          {
            model: AppointmentJunkStyle,
            as: "appointmentJunkStyle",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            include: [
              {
                model: Style,
                as: "style",
                attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              },
            ],
          },
        ],
      });

      cari = JSON.parse(JSON.stringify(cari));

      const dataTODAY = cari.filter((e) => e.appointmentDate === TODAY);
      const databesok = cari.filter((e) => e.appointmentDate === besok);
      const datalusa = cari.filter((e) => e.appointmentDate === lusa);

      databesok.slice(1, 6); //untuk ngambil 5 data untuk ditampilkan
      dataTODAY.slice(1, 6); //untuk ngambil 5 data untuk ditampilkan
      datalusa.slice(1, 6); //untuk ngambil 5 data untuk ditampilkan
      dataTODAY.unshift({ tanggal: TODAY });
      databesok.unshift({ tanggal: besok });
      datalusa.unshift({ tanggal: lusa });
      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: { dataTODAY, databesok, datalusa, cari },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllCountAppointment: async (req, res) => {
    try {
      let start = moment().tz("UTC").startOf("month").toDate();
      let end = moment().tz("UTC").endOf("month").toDate();

      let cari = await Appointment.findAll({
        where: {
          appointmentDate: {
            [Op.between]: [start, end],
          },
        },
      });

      cari = JSON.parse(JSON.stringify(cari));
      const dataCancel = cari.filter((e) => e.status === -1);
      const dataScheduled = cari.filter((e) => e.status === 2);
      const dataDone = cari.filter((e) => e.status === 3);
      const dataWaitingApproval = cari.filter((e) => e.status === 1);
      let TotalAppointment = {
        Appointment: cari.length,
        AppointmentRejected: dataCancel.length,
        AppointmentScheduled: dataScheduled.length,
        AppointmentDone: dataDone.length,
        AppointmentWait: dataWaitingApproval.length,
      };
      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: TotalAppointment,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getAllCountProject: async (req, res) => {
    try {
      let start = moment().tz("UTC").startOf("month").toDate();
      let end = moment().tz("UTC").endOf("month").toDate();

      let cari = await Project.findAll({
        where: {
          completedAt: {
            [Op.between]: [start, end],
          },
        },
      });

      cari = JSON.parse(JSON.stringify(cari));
      const dataCancel = cari.filter((e) => e.status === -1);
      const dataOnGoing = cari.filter((e) => e.status === 2);
      const dataCompleted = cari.filter((e) => e.status === 3);
      const dataWaitingPayment = cari.filter((e) => e.status === 1);
      let TotalProject = {
        Project: cari.length,
        ProjectCancel: dataCancel.length,
        ProjectOnGoing: dataOnGoing.length,
        ProjectCompleted: dataCompleted.length,
        ProjectWaitingPayment: dataWaitingPayment.length,
      };
      res.status(200).json({
        status: "Succes",
        message: "Successfully retrieve the data",
        result: TotalProject,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
