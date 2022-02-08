const { User, Appointment } = require("../models")
const errorHandler = require("../helpers/error-handler")
const bcrypt = import("bcrypt")

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
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {},
            });
            
        }
    },



    register: async (req, res) => {
        
        try {

            console.log(req.body)
            const data = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:  req.body.email,
                password: req.body.password,
                is_admin: req.body.is_admin,
                picture: req.body.picture,
                phone: req.body.phone
            });

            console.log(data)
            return res.status(201).json({
                msg: `Registrasi Berhasil`, data
            });
        }

        catch(error) {
            errorHandler(res, error)
            console.log(err)
            res.status(500).json({
                msg: `Registrasi Gagal`,
                error: err.message
            });
        }
        
    },

    login: async (req, res) => {
        try {
            const user = await Users.findOne({
                where: {
                email:emailX,
                },
            });

            if (!user) {
                return res.status(401).json({
                status: "Unauthorized",
                message: "Invalid email and password combination",
                result: {},
                });
            }

            const valid = await bcrypt.compare(password, user.password);
                if (!valid) {
                return res.status(401).json({
                status: "Unauthorized",
                message: "Invalid email and password combination",
                result: {},
                });
            }

            const token = jwt.sign(
                {
                email: user.email,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
                },
                "123321",
                { expiresIn: "24h" },
            );

            // let token = generateToken(payload); 
        
            res.status(200).json({
                status: "Success",
                message: "Logged in successfully",
                result: {
                token,
                },
            });

        }



        catch(error) {
            errorHandler(res, error)
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {},
            });
        }
    }
}