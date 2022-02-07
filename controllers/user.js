const { User, Appointment } = require("../models")
const errorHandler = require("../helpers/error-handler")

module.exports = {
    getOne: async (req, res) => {
        try {
            const data = req.user
            const result = {
                id: data.id,
                name: data.name,
                email: data.email
            }

            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}