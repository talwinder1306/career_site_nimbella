const express = require('express')
const router = express.Router()

const Github = require('../models/Github')
const { githubDataRule, validate } = require('./inputValidator')

router.get('/', async (req, res) => {
    try {
        const github = await Github.find()
        res.json(github)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:username', async (req, res) => {
    try {
        const github = await Github.findOne({username: req.params.username})
        res.json(github)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post('/', githubDataRule(), validate ,async (req, res) => {
    try {
        const github = new Github(req.body)
        
        const result = await github.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router