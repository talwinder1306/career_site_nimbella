const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    email: {type: String, required: true},
    fullName: {type: String, required: true},
    sessionKey: {type: String, required: true},
    currentCTC: {type: Number},
    expectedCTC: {type: Number},
    noticePeriod: {type: Number},
    skills: [{type: String}],
    yearsOfExperience: {type: Number},
    workExperience: [{
        startDate: {type: Date},
        endDate: {type: Date},
        jobTitle: {type: String},
        description: {type: String},
        company: {type: String}
    }],
    profileRating: {type: Number},
    bio: {type: String},
    education: [{
        startDate: {type: Date},
        endDate: {type: Date},
        areaOfStudy: {type: String},
        university: {type: String}
    }],
    // otherProjects: [{}],
    languages: [{type: String}],
    otherProfiles: {
        hackerrank: {type: String},
        github: {type: String},
        stackOverflow: {type: String}
    }
  }
);

//Export model
module.exports = mongoose.model('Candidates', CandidateSchema);