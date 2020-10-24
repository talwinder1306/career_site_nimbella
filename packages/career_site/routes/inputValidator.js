const { body, validationResult } = require('express-validator')

const candidateDataRule = () => {
    return [
        body('email').isEmail(),
        body('fullName').isString(),
        body('sessionKey').isString(),
        body('currentCTC').optional().isFloat(),
        body('expectedCTC').optional().isFloat(),
        body('noticePeriod').optional().isInt({ min: 0, max: 4 }),
        body('skills').optional().isArray(),
        body('yearsOfExperience').optional().isInt({ min: 0, max: 100 }),
        body('workExperience').optional().isArray(),
        body('workExperience.*.startDate').optional().isDate(),
        body('workExperience.*.endDate').optional().isDate(),
        body('workExperience.*.jobTitle').optional().isString(),
        body('workExperience.*.description').optional().isString(),
        body('workExperience.*.company').optional().isString(),
        body('profileRating').optional().isFloat({ min: 0.0, max: 10.0 }),
        body('bio').optional().isString(),
        body('education').optional().isArray(),
        body('education.*.startDate').optional().isDate(),
        body('education.*.endDate').optional().isDate(),
        body('education.*.areaOfStudy').optional().isString(),
        body('education.*.university').optional().isString(),
        // achievements,
        body('languages').optional().isArray(),
        body('otherProfiles.hackerrank').optional().isString(),
        body('otherProfiles.github').optional().isString(),
        body('otherProfiles.stackOverflow').optional().isString()
    ]
}

const candidateRatingRule = () => {
    return [
        body('profileRating').exists().isFloat({ min: 0.0, max: 10.0 }),
        body('admin').isString(),
    ]
}

const recruiterDataRule = () => {
    return [
        body('email').isEmail(),
        body('fullName').isString(),
        body('sessionKey').isString(),
        body('company').optional().isString(),
        body('title').optional().isString(),
        body('saveForLater').optional().isArray(),
        body('jobApplication').optional().isArray(),
        body('jobApplication.*.role').optional().isString(),
        body('jobApplication.*.description').optional().isString(),
        body('jobApplication.*.location').optional().isString(),
        body('jobApplication.*.postedOn').optional().isDate(),
        body('jobApplication.*.status').optional().isString(),
        body('jobApplication.*.company').optional().isString(),
        body('jobApplication.*.experienceRange').optional().isInt(),
        body('jobApplication.*.qualification').optional().isString(),
        body('jobApplication.*.skillsNeeded').optional().isString(),
        body('jobApplication.*.expectations').optional().isString()
    ]
}

const userLoginRule = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('userType').isIn(["C","R"])
    ]
}

const userUpdatePasswordRule = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('oldPassword').isLength({ min: 8 }),
        body('userType').isIn(["C","R"])
    ]
}

const hackerrankDataRule = () => {
    return [
        body('username').isString(),
        body('algorithmRating').isFloat({ max: 3000 }),
        body('averageContestRank').isFloat({min: 0, max: 100 }),
        body('percentile').isFloat({min: 0, max: 100 }),
        body('practiceProblemScores').isArray(),
        body('practiceProblemScores.*.topic').optional().isString(),
        body('practiceProblemScores.*.score').optional().isFloat({min: 0, max: 100 })
    ]
}

const githubDataRule = () => {
    return [
        body('username').isString(),
        body('repositories').isFloat(),
        body('totalContributions').isInt(),
        body('monthlyAverageContributions').isFloat()
    ]
}

const stackoverflowDataRule = () => {
    return [
        body('username').isString(),
        body('questions').isInt(),
        body('answers').isInt(),
        body('reputation').isInt(),
        body('badge.gold').isInt(),
        body('badge.silver').isInt(),
        body('badge.bronze').isInt(),
        body('tags').isArray(),
        body('tags.*.topic').optional().isString(),
        body('tags.*.score').optional().isInt(),
        body('tags.*.posts').optional().isInt()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    candidateDataRule,
    candidateRatingRule,
    recruiterDataRule,
    userLoginRule,
    userUpdatePasswordRule,
    hackerrankDataRule,
    githubDataRule,
    stackoverflowDataRule,
    validate
}