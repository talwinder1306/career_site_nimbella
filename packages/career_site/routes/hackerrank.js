const express = require('express')
const router = express.Router()

const Hackerrank = require('../models/Hackerrank')
const { hackerrankDataRule, validate } = require('./inputValidator')

router.get('/', async (req, res) => {
    try {
        const hackerrank = await Hackerrank.find()
        res.json(hackerrank)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:username', async (req, res) => {
    try {
        const hackerrank = await Hackerrank.findOne({username: req.params.username})
        res.json(hackerrank)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post('/', hackerrankDataRule(), validate ,async (req, res) => {
    try {
        const hackerrank = new Hackerrank(req.body)

        const result = await hackerrank.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router