const express = require('express')
const router = express.Router()

const Recruiter = require('../models/Recruiter')
const {recruiterDataRule, validate} = require('./inputValidator')

function getRecruiterObj(reqObj) {
    const jobApplicationObj = []

    for(let i in reqObj.jobApplication) {
        let jobObj = {}

        jobObj.role = reqObj.jobApplication[i].role
        jobObj.description = reqObj.jobApplication[i].description
        jobObj.location = reqObj.jobApplication[i].location
        jobObj.postedOn = new Date(reqObj.jobApplication[i].postedOn)
        jobObj.status = reqObj.jobApplication[i].status
        jobObj.company = reqObj.jobApplication[i].company
        jobObj.experienceRange = reqObj.jobApplication[i].experienceRange
        jobObj.qualification = reqObj.jobApplication[i].qualification
        jobObj.skillsNeeded = reqObj.jobApplication[i].skillsNeeded
        jobObj.expectations = reqObj.jobApplication[i].expectations

        jobApplicationObj.push(jobObj)
    }

    const recruiter = {
        email: reqObj.email,
        fullName: reqObj.fullName,
        sessionKey: reqObj.sessionKey,
        company: reqObj.company,
        title: reqObj.title,
        saveForLater: reqObj.saveForLater,
        jobApplication: jobApplicationObj
    }

    return recruiter
}

router.get('/', async (req,res) => {
    try {
        if (req.query.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }
        const result = await Recruiter.find()
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:email', async (req,res) => {
    try {
        const recruiter = await Recruiter.findOne({email: req.params.email})

        if (recruiter.sessionKey !== req.query.sessionKey) {
            return res.status(401).json({message: "Not authorized! Log in and try again"})
        }

        res.json(recruiter)
    } catch(err) {
        res.status(500).json({message: err})
    }
})

router.post('/', recruiterDataRule(), validate, async (req,res) => {
    try {
        if (req.query.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }
        const recruiterObj = getRecruiterObj(req.body)
        const recruiter = new Recruiter(recruiterObj)

        await recruiter.save()
        res.json({message: "Recruiter profile created successfully!"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put('/', recruiterDataRule(), validate, async (req,res) => {
    try {
        const recruiterObj = getRecruiterObj(req.body)
        const recruiter = await Recruiter.findOne({email: recruiterObj.email})

        if (recruiter.sessionKey !== recruiterObj.sessionKey) {
            return res.status(401).json({message: "Not authorized! Log in and try again"})
        }

        await Recruiter.replaceOne({email: req.params.email}, recruiterObj)
        res.json({ message: "Recruiter profile updated successfully!" })
    } catch(err) {
        res.status(500).json({message: err})
    }
})

router.patch('/updateSessionKey', async (req,res) => {
    try {
        if (req.query.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }
        await Recruiter.updateOne({email: req.body.email}, {sessionKey: req.body.sessionKey})
        res.json({ message: "Session Key updated successfully!" })
    } catch(err) {
        res.status(500).json({message: err})
    }
})

module.exports = router