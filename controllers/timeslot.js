const { Appointment, Timeslot, ServiceType }= require("../models")
const errorHandler = require("../helpers/error-handler")

module.exports = {
    getSlot: async (req, res) => {
        try {
            const { date, servicetype } = req.query
            const serviceType = await ServiceType.findOne({ where: { name: servicetype } })
            const timeslot = await Timeslot.findAll({ 
                where: { 
                    serviceTypeId: serviceType.id
                },
                attributes: {
                    exclude: ["serviceTypeId", "createdAt", "updatedAt"]
                },
                raw: true,
            })
            const quota = timeslot.map(el => el.quota)
            const timeslotId = timeslot.map(el => el.id)
            let arr = []
            for (let i = 0; i < timeslotId.length; i++) {
                const count = await Appointment.findAll({
                            where: {
                                appointmentDate: date,
                                timeslotId: timeslotId[i]
                            },
                        })
                arr.push(count.length)
            }
            const result =  timeslot.map( (el, i) => {
                if (arr[i] < quota[i]) {
                    el.slot = "READY"
                } else {
                    el.slot = "FULL"
                }
                return el
            })
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },
}