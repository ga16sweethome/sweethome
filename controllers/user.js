const { User, Appointment } = require("../models")
const errorHandler = require("../helpers/error-handler")

module.exports = {
    getOne: async (req, res) => {
        try {
            //const data = req.user // DARI TOKEN
            const data = await Appointment.findOne({where:1})
            // const result = {
            //     id: data.id,
            //     name: `${data.firstName} ${data.lastName}`,
            //     email: data.email
            // }

            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}