const { ServiceType, BuildingType, Section, Style } = require("../models")
const errorHandler = require("../helpers/error-handler")


module.exports = {
    getServiceType: async (req, res) => {
        try {
            const result = await ServiceType.findAll()
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },

    getBuildingType: async (req, res) => {
        try {
            const result = await BuildingType.findAll()
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },

    getSection: async (req, res) => {
        try {
            const result = await Section.findAll()
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },

    getStyle: async (req, res) => {
        try {
            const result = await Style.findAll()
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },
}