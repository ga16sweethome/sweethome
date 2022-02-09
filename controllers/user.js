const { User, Appointment } = require("../models")
const errorHandler = require("../helpers/error-handler")
const Joi = require('joi') //use joi validation NPM
const { hashPassword,comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

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
    },



    register: async (req, res) => {
        const {firstName,lastName,email,password} = req.body
        try {
            const schema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            });
            // console.log(data)
            const { error } = schema.validate(req.body);
            if(error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.message,
                });
            }
            const passwordhashed = hashPassword(password)
            const data = await User.create({
                firstName,
                lastName,
                email,
                password: passwordhashed,
            });
            if(!data){
                return res.status(401).json({
                    status  : "Failed",
                    message : "Failed to register"
                })
            }
            return res.status(201).json({
                msg: `Registrasi Berhasil`, 
                result : "You can login now"
            });
        }

        catch(error) {
            errorHandler(res, error)
            
        }
        
    },

    login: async (req, res) => {
        const {email,password} = req.body
         try {
             const schema = Joi.object({
                 email: Joi.string().email().required(),
                 password: Joi.string().min(6).required(),
               });
 
             const { error } = schema.validate(req.body);
               if(error) {
                   return res.status(400).json({
                       status: "Bad Request",
                       message: error.message,
                     });
               }
 
             const user = await User.findOne({
                 where: {
                 email,
                 },
             });
 
             if (!user) {
                 return res.status(401).json({
                 status: "Unauthorized",
                 message: "Invalid email and password combination",
                 result: {},
                 });
             }
            const checkPassword = comparePassword(password, user.password);
            if(!checkPassword){
             return res.status(401).json({
                 message: "Incorrect Username or Password",
                 status: "Unauthorized",
               });
            }
             const token = generateToken({
                 id: user.id,
                 email: user.email,
                 name : `${user.firstName} ${user.lastName}`,
                 picture : user.picture,
                 phone : user.phone
               })            
            // let token = generateToken(payload); 
         
             res.status(200).json({
                 status: "Success",
                 message: "Logged in successfully",
                 result: {token}
             });
 
         }
 
 
 
         catch(error) {
             errorHandler(res, error)
             
         }
     }
}