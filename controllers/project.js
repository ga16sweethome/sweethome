const { Project,Appointment,Timeslot,BuildingType,ProjectDetail,ProjectType,Section} = require("../models")
const errorHandler = require("../helpers/error-handler")
const Joi =require('joi')
const { Op} = require('sequelize')


module.exports = {
    getAllProjectByUser: async (req, res) => {
        
        try {
            
            const data = await Project.findAll ({ 
                where : { userId : req.user.id },
                attributes: {
                        exclude: ["id", "createdAt", "updatedAt"],
                      },
                include: [
                    {
                      model : ProjectDetail,
                      as : "projectDetail",
                      attributes: {
                        exclude: ["id", "createdAt", "updatedAt","projectTypeId","projectId"],
                      },
                      include : [{
                          model : ProjectType,
                          as : "projectType",
                          attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                            },
                          },
                          {
                          model : Section,
                          as : "section",
                          attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                            },
                          }
                    ]
                    },
                    {
                      model: Appointment,
                      as: "appointment",
                      attributes: {
                        exclude: ["id", "createdAt", "updatedAt","note","","budget","serviceTypeId","estimateTime","completedAt","timeslotId","buildingTypeId"],
                      },
                      include : [ {
                        model : BuildingType,
                        as : "buildingType",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt",],
                        }
                        },{
                        model : Timeslot,
                        as : "timeslot",
                        attributes: {
                        exclude: ["id", "createdAt", "updatedAt","budget","serviceTypeId","quota"],
                        }
                        }
                      ]
                    }
                  ]
            })
            
            res.status(200).json(data)
        } catch (error) {
            errorHandler(res, error)
        }
    },
    uploadReceipt : async (req,res)=>{
        const body = req.body
        const {id} = req.params
        try {
            const schema = Joi.object({  //schema mengisi validasi object sbb
                uploadReceipt :Joi.string().required(),
                noteUploadReceipt : Joi.string().required()
              })

            const {error} = schema.validate({
                body,
                uploadReceipt : File.path
            })

            if(error){
                return res.status(400).json({
                    status : "Bad Request",
                    message : error.message
                })
            }

            const update = await Project.update({
                uploadReceipt : req.body.uploadReceipt,
                noteUploadReceipt : req.body.noteUploadReceipt
                 },{where : {id,userId : req.user.id}
            })
            if(update[0] !=1){
                return res.status(500).json({
                  status : "Internal server error",
                  result : {}  
                })
              }
            const check = await Project.findAll({
                where : {
                    uploadReceipt : {
                        [Op.not] : null
                    },
                     userId :  req.user.id
                }
            })
            return res.status(200).json({
            status : "Berhasil update data",
            message : "Berhasil mengupdate vendor dengan adminId "+ adminId,
            result : checkUpdate
            })
        } catch (error) {
            
        }
    },
    check :async (req,res)=>{
        try {
            const cari = await Project.findAll({
                where : {
                    userId :{
                        [Op.not] :4
                    }
                    // noteUploadReceipt : {
                    //     [Op.ne]: null// "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg"
                    // }
                }
            })
            res.status(200).json({cari})
        } catch (error) {
            errorHandler(res,error)
        }
    }
}