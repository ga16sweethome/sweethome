const { Project } = require("../models")
const errorHandler = require("../helpers/error-handler")


module.exports = {
  getAllProjectById: async (req, res) => {
        const {id} = req.params //klo sudah ada token ngambilnya userId dari token
        try {
            //const id = req.user // DARI TOKEN
            const data = await Project.findAll ({ where : { userId : id  },})
            
            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    }
  
}