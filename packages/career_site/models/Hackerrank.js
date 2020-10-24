const mongoose = require('mongoose')

const HackerrankSchema = mongoose.Schema ({
    username: {type: String, required: true},
    algorithmRating: {type: Number },
    averageContestRank: {type: Number},
    percentile: {type: Number},
    practiceProblemScores: [{
        topic: {type: String},
        score: {type: Number}
    }]
})

module.exports = mongoose.model('Hackerrank', HackerrankSchema)