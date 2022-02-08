const { User } = require("../models")
const errorHandler = require("../helpers/error-handler")

module.exports = {
    getOne: async (req, res) => {
        try {
            //const id = req.user.id // DARI TOKEN
            const id = 3 //sementara idnya dibuat static 
            const data = await User.findOne({where:id})
            const result = {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email
            }

            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}