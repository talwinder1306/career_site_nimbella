const express = require('express')
const router = express.Router()

const Stackoverflow = require('../models/Stackoverflow')
const { stackoverflowDataRule, validate } = require('./inputValidator')

router.get('/', async (req, res) => {
    try {
        const stackoverflow = await Stackoverflow.find()
        res.json(stackoverflow)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:username', async (req, res) => {
    try {
        const stackoverflow = await Stackoverflow.findOne({username: req.params.username})
        res.json(stackoverflow)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post('/', stackoverflowDataRule(), validate ,async (req, res) => {
    try {
        const stackoverflow = new Stackoverflow(req.body)
        
        const result = await stackoverflow.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router