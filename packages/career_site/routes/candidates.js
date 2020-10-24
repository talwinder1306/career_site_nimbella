const express = require('express')
const router = express.Router()

// const axios = require('axios')

const Candidate = require('../models/Candidate')
const { candidateDataRule, candidateRatingRule, validate } = require('./inputValidator.js')

function getCandidateObj(reqObj) {
    const workExperienceObj = []
    const educationObj = []

    for (let i in reqObj.workExperience) {
        let workObj = {}
        workObj.startDate = new Date(reqObj.workExperience[i].startDate)
        workObj.endDate = new Date(reqObj.workExperience[i].endDate)
        workObj.jobTitle = reqObj.workExperience[i].jobTitle
        workObj.description = reqObj.workExperience[i].description
        workObj.company = reqObj.workExperience[i].company
        workExperienceObj.push(workObj)
    }

    for (let i in reqObj.education) {
        let eduObj = {}
        eduObj.startDate = new Date(reqObj.education[i].startDate)
        eduObj.endDate = new Date(reqObj.education[i].endDate)
        eduObj.areaOfStudy = reqObj.education[i].areaOfStudy
        eduObj.university = reqObj.education[i].university
        educationObj.push(eduObj)
    }

    const candidate = {
        email: reqObj.email,
        fullName: reqObj.fullName,
        sessionKey: reqObj.sessionKey,
        currentCTC: reqObj.currentCTC,
        expectedCTC: reqObj.expectedCTC,
        noticePeriod: reqObj.noticePeriod,
        skills: reqObj.skills,
        yearsOfExperience: reqObj.yearsOfExperience,
        workExperience: workExperienceObj,
        profileRating: reqObj.profileRating,
        bio: reqObj.bio,
        education: educationObj,
        // achievements: reqObj.achievements,
        languages: reqObj.languages,
        otherProfiles: reqObj.otherProfiles
    }

    return candidate
}

router.get('/', async (req, res) => {
    try {
        const candidate = await Candidate.find()
        res.json(candidate)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.get('/:email', async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ email: req.params.email })
        res.json(candidate)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.post('/', candidateDataRule(), validate, async (req, res) => {
    try {
        if (req.query.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }

        const candidateObj = getCandidateObj(req.body)
        const candidate = new Candidate(candidateObj)

        await candidate.save()
        res.json({ message: "Candidate profile created successfully!" })
    } catch (err) {
        res.status(500).json({ message: err })
    }

})

router.put('/', candidateDataRule(), validate, async (req, res) => {
    try {
        const candidateObj = getCandidateObj(req.body)
        const candidate = await Candidate.findOne({ email: candidateObj.email })

        if (candidate.sessionKey !== candidateObj.sessionKey) {
            return res.status(401).json({ message: "Not authorized! Log in and try again" })
        }

        await Candidate.replaceOne({ email: candidateObj.email }, candidateObj)
        res.json({ message: "Candidate profile updated successfully!" })
    } catch (err) {
        res.status(500).json({ message: err })
    }

})

// Patch request for updating rating
router.patch('/updateRating/:email', candidateRatingRule(), validate, async (req, res) => {
    try {
        if (req.body.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }

        const savedCandidate = await Candidate.updateOne({ email: req.params.email }, { profileRating: req.body.profileRating })
        res.json({ message: "Candidate profile updated successfully!" })
    } catch (err) {
        res.status(500).json({ message: err })
    }

})

router.patch('/updateSessionKey', async (req, res) => {
    try {
        if (req.query.admin !== "adminPass") {
            return res.status(401).json({ message: "Not authorized" })
        }
        await Candidate.updateOne({ email: req.body.email }, { sessionKey: req.body.sessionKey })
        res.json({ message: "Session Key updated successfully!" })
    } catch (err) {
        res.status(500).json({ message: err })
    }

})

// Do not use. Work in progress
// router.patch('/generateRating', candidateDataRule(), validate, async (req, res) => {
//     try {
//         const candidateObjProfile = getCandidateObj(req.body).otherProfiles
//         console.log(candidateObjProfile)
//         let rating = 0

//         if (candidateObjProfile.hackerrank !== undefined) {
//             const hackerrankProfile = await axios.get('/hackerrank/' + candidateObjProfile.hackerrank);
//             // console.log(hackerrankProfile);
//         }
//         if (candidateObjProfile.github !== undefined) {
//             const githubProfile = await axios.get('/github/' + candidateObjProfile.github);
//             // console.log(githubProfile);
//         }
//         if (candidateObjProfile.stackoverflow !== undefined) {
//             const stackoverflowProfile = await axios.get('/stackoverflow/' + candidateObjProfile.stackoverflow);
//             // console.log(stackoverflowProfile);
//         }

//         res.json({ message: "Candidate rating generated successfully!", profileRating: rating })
//     } catch (err) {
//         res.status(500).json({ message: err })
//     }

// })

module.exports = router