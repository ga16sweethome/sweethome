const { Showcase,ShowcaseType,Project} = require("../models")
const errorHandler = require("../helpers/error-handler")


module.exports = {
    getOne: async (req, res) => {
        const {id} = req.params
        try {
            //const data = req.user // DARI TOKEN
            const data = await Showcase.findAll ({
                where : {
                    id : id
                   },
                order : [["createdAt",'DESC']],
                include : [
                  {
                    model : ShowcaseType,
                    as : "ShowcaseType",
                    attributes : {
                      exclude : ["id","createdAt","updatedAt"]  
                    }
                  },
                  {
                    model : Project,
                    as : "project",
                    attributes : {
                      exclude : ["id","createdAt","updatedAt"]  
                    }
                  }
                ],
                // attributes : {
                //   exclude : ["brandId","id","createdAt","updatedAt"]  
                // }
             })
            
            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}