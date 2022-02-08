const { Favorite ,Showcase} = require("../models")
const errorHandler = require("../helpers/error-handler")


module.exports = {
  getAllFavoriteByUserId: async (req, res) => {
        const {id} = req.params //klo sudah ada token ngambilnya userId dari token
        try {
            //const data = req.user // DARI TOKEN
            const data = await Favorite.findAll (
                { where : { userId : id  },
                  attributes : {
                      exclude : ["id","createdAt","updatedAt"]
                    },
                  include : {
                      model :  Showcase,
                      as : "showcase",
                      attributes : {
                        exclude : ["id","createdAt","updatedAt","showcaseTypeId","projectId","is_shown"]
                      }

                  }})
            
            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    },
  createFavorite: async (req, res) => {
      const {showcaseId} = req.params 
      try {
      
          const user = 3 //seharusnya ngambil dari req.user (dari TOKEN), sementara dikasih value default 3
          const checkfavorite = await Favorite.findAll({
              where : 
              {userId : user,
              showcaseId
              }
           })  
          if (!checkfavorite)   
          {
             const favorite = await Favorite.create({
                userId : user,
                showcaseId
              })  
             return res.status(200).json(favorite) 
          }
        
        res.status(200).json({})
      } catch (error) {
          errorHandler(res, error)
      }
  },
  deleteFavorite : async (req, res) =>{
      
  }
}