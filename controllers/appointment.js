const { Appointment, Timeslot, ServiceType, BuildingType, Section, Style, LastActivity, AppointmentJunkSection, AppointmentJunkStyle } = require("../models")
const errorHandler = require("../helpers/error-handler")
const joi = require("joi").extend(require("@joi/date"))

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = req.user
            const result = await Appointment.findAll ({ where : { userId: data.id },})
            if (!result) {
                return res.status(401).json({
                    message: "Not Found",
                    result: {}
                })
            }
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },

    create: async (req, res) => {
        const body = req.body
        const user = req.user
        try {
            const schema = joi.object({
                buildingType: joi.string().required(),
                serviceType: joi.string().required(),
                estimateTime: joi.number().required(),
                budget: joi.number().required(),
                address: joi.text().required(),
                note: joi.text().required(),
                date: joi.date().format("YYYY-MM-DD").required(),
                time: joi.string().required()
            })
            const { error } = schema.validate(body)
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.message,
                    result: {},
                });
            }

            const buildingType = await BuildingType.findOne({ where: { buildingType: body.buildingType }})
            const serviceType = await ServiceType.findOne({ where: { serviceType: body.serviceType }})
            const timeslot = await Timeslot.findOne({
                where: {
                    time: body.time,
                    serviceTypeId: serviceType.id
                }
            })

            const create = await Appointment.create({
                userId: user.id,
                buildingType: buildingType.id,
                serviceType: serviceType.id,
                estimateTime: body.estimateTime,
                budget: body.budget,
                address: body.address,
                note: body.note,
                appointmentDate: body.date,
                timeslotId: timeslot.id,
                status: 1
            })

            const code = () => {
                var str = "" + create.id
                var pad = "0000"
                var ans = pad.substring(0, pad.length - str.length) + str
                return "A#" + ans
            }
            const update = await Appointment.update({ code })

            await LastActivity.update({
                where: { userId: user.id },
                submitted: create.createdAt
            },
            )

            const section = await Section.findAll({ where: { name: body.sections }})
            const sectionId = section.map( el => el.id )
            const appointmentJunkSection = []
            for (let i = 0; i < sectionId.length; i++) {
                appointmentJunkSection.push({
                    appointmentId: create.id,
                    sectionId: sectionId[i]
                })
            } await AppointmentJunkSection.bulkCreate(appointmentJunkSection)

            const style = await Style.findAll({ where: { name: body.styles }})
            const styleId = await style.map( el => el.id )
            const appointmentJunkStyle = []
            for (let i = 0; i < styleId.length; i++) {
                appointmentJunkStyle.push({
                    appointmentId: create.id,
                    styleId: styleId[i]
                })                
            } await AppointmentJunkStyle.bulkCreate(appointmentJunkStyle)

            res.status(200).json(update)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}