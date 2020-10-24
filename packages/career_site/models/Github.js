const mongoose = require('mongoose')

const GithubSchema = mongoose.Schema ({
    username: {type: String, required: true},
    repositories: {type: Number },
    totalContributions: {type: Number},
    monthlyAverageContributions: {type: Number}
})

module.exports = mongoose.model('Github', GithubSchema)