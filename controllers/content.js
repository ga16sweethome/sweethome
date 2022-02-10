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
    
    createServiceType: async (req, res) => {
        const { servicetype } = req.params
        try {
            const result = await ServiceType.create({ name: servicetype })
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

    createBuildingType: async (req, res) => {
        const { buildingtype } = req.params
        try {
            const result = await BuildingType.create({ name: buildingtype })
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

    createSection: async (req, res) => {
        const { section } = req.params
        try {
            const result = await Section.create({ name: section })
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

    createStyle: async (req, res) => {
        const { style } = req.params
        try {
            const result = await Style.create({ name: style })
            res.status(200).json(result)
        } catch (error) {
            errorHandler(res, error)
        }
    },
}