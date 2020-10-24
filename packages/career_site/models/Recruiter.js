const mongoose = require('mongoose')

const RecruiterSchema = new mongoose.Schema ({
    email: {type: String, required: true},
    fullName: {type: String, required: true},
    sessionKey: {type: String, required: true},
    company: {type: String},
    title: {type: String},
    saveForLater: [{type: String}],
    jobApplication: [{
        role: {type: String},
        description: {type: String},
        location: {type: String},
        postedOn: {type: Date},
        status: {type: String},
        company: {type: String},
        experienceRange: {type: Number},
        qualification: {type: String},
        skillsNeeded: {type: String},
        expectations: {type: String}
    }]

})

module.exports = mongoose.model('Recruiter', RecruiterSchema)