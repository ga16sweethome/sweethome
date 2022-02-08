const { Favorite,Showcase,ShowcaseType,Project,Appointment,ProjectDetail,ServiceType,Section,BuildingType,ProjectType,ShowcaseJunkStyle,Style} = require("../models")
const errorHandler = require("../helpers/error-handler")



module.exports = {
    getOneShowcase: async (req, res) => {
        const {id} = req.params
        try {
            //const data = req.user // DARI TOKEN
           let query =""
           const find = await Showcase.findAll({
             where : {
               id
             }
          })

          if (find[0].showcaseTypeId == 1) {
               query = { include : [
                       {
               model : ShowcaseJunkStyle,
                as : "showcaseJunkstyle",
                attributes : {
                  exclude : ["id","createdAt","updatedAt","showcaseId"]  
                },
                include : [{
                  model : Style,
                  as : "style",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                }]
              
            },
            {
              model : Project,
              as : "project",
              attributes : {
                exclude : 
                ["id","createdAt","updatedAt", "code",
                "userId","uploadReceipt","noteUploadReceipt","requestCancel",
                "reasonCancel","confirmPayment","status","completedAt",
              ]  
              },
              include : [{
                model : Appointment,
                as : "appointment",
                attributes : {
                  exclude : ["completedAt","id","createdAt","updatedAt","userId","code","status","timeslotId"
                ,"appointmentDate","note","budget","estimateTime","serviceTypeId","buildingTypeId",
              ]  
                },
                include : [{
                  model : BuildingType,
                  as : "buildingType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                },
                {
                  model : ServiceType,
                  as : "serviceType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                }]
              },
              {
                model : ProjectDetail,
                as : "projectDetail",
                attributes : {
                  exclude : ["id","createdAt","updatedAt","projectTypeId","sectionId",]  
                },
                include : [{
                  model : ProjectType,
                  as : "projectType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                  },
                  {
                    model : Section,
                    as : "section",
                    attributes : {
                      exclude : ["id","createdAt","updatedAt"]
                    }
                  }],
                
                
              }
            ],
            
            },
           
           ]}
          } 

            // const checkShowcaseType = await Showcase.findAll({
            //   where : {
            //     id
            //   },
            //   exclude : ["id","createdAt","updatedAt", "createdBy","is_shown","showcaseTypeId","projectId",]
            // })
            // console.log("\nIni Hasilnya\n",checkShowcaseType);
            

            const data = await Showcase.findAll ({
                where : {
                    id : id,
                    is_shown : true,
                   },
                attributes : {
                  exclude : ["id","createdAt","updatedAt", "createdBy","is_shown","showcaseTypeId","projectId",]  
                },
                
             })
            
            
            const checkFavortis = await Favorite.findAll (
              { where : { 
                userId : id,
                showcaseId : 2  },
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

            //  const price = data[0].project.projectDetail
            //  let sumPrice = 0,sumArea=0;sumWorkDuration = 0 
            //  const total={}           
            //  for ( let i = 0;i<price.length;i++)
            // { sumPrice +=  data[0].project.projectDetail[i].price
            //   total.Cost = sumPrice
            //   sumArea +=  data[0].project.projectDetail[i].area
            //   total.Area_Size = sumArea
            //   sumWorkDuration +=  data[0].project.projectDetail[i].workDuration
            //   total.RenovationDuration = sumWorkDuration
            // }
         
         
            res.status(200).json({data})
        } catch (error) {
            errorHandler(res, error)
        }
    },










    
    getAllShowcase: async (req, res) => {
          try {
          //const data = req.user // DARI TOKEN
          let query = { include : [
            // {
            //   model : ShowcaseType,
            //   as : "showcaseType",
            //   attributes : {
            //     exclude : ["id","createdAt","updatedAt"]  
            //   }, 
            // },
            {
               model : ShowcaseJunkStyle,
                as : "showcaseJunkstyle",
                attributes : {
                  exclude : ["id","createdAt","updatedAt","showcaseId"]  
                },
                include : [{
                  model : Style,
                  as : "style",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                }]
              
            },
            {
              model : Project,
              as : "project",
              attributes : {
                exclude : 
                ["id","createdAt","updatedAt", "code",
                "userId","uploadReceipt","noteUploadReceipt","requestCancel",
                "reasonCancel","confirmPayment","status","completedAt",
              ]  
              },
              include : [{
                model : Appointment,
                as : "appointment",
                attributes : {
                  exclude : ["completedAt","id","createdAt","updatedAt","userId","code","status","timeslotId"
                ,"appointmentDate","note","budget","estimateTime","serviceTypeId","buildingTypeId",
              ]  
                },
                include : [{
                  model : BuildingType,
                  as : "buildingType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                },
                {
                  model : ServiceType,
                  as : "serviceType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                }]
              },
              {
                model : ProjectDetail,
                as : "projectDetail",
                attributes : {
                  exclude : ["id","createdAt","updatedAt","projectTypeId","sectionId",]  
                },
                include : [{
                  model : ProjectType,
                  as : "projectType",
                  attributes : {
                    exclude : ["id","createdAt","updatedAt"]  
                  }
                  },
                  {
                    model : Section,
                    as : "section",
                    attributes : {
                      exclude : ["id","createdAt","updatedAt"]
                    }
                  }],
                
                
              }
            ],
            
            },
           
          ],}
          const data = await Showcase.findAll ({
              
              order : [["createdAt",'DESC']],
              include : [
                {
                  model : ShowcaseType,
                  as : "showcaseType",
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
                },
                query
               
              ],
              // attributes : {
              //   exclude : ["id","createdAt","updatedAt"]  
              // }
           })
          
          res.status(200).json({data})
      } catch (error) {
          errorHandler(res, error)
      }
  }
}