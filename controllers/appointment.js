const { Appointment} = require("../models")
const errorHandler = require("../helpers/error-handler")


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
    }
}