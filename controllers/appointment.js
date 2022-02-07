const { Appointment} = require("../models")
const errorHandler = require("../helpers/error-handler")


module.exports = {
    getOne: async (req, res) => {
        const {id} = req.params
        try {
            //const data = req.user // DARI TOKEN
            const data = await Appointment.findAll ({ where : { id  },})
            
            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}