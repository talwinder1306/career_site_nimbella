const mongoose = require('mongoose')

const StackoverflowSchema = mongoose.Schema ({
    username: {type: String, required: true},
    questions: {type: Number },
    answers: {type: Number},
    reputation: {type: Number},
    badge: {
        gold: {type: Number},
        silver: {type: Number},
        bronze: {type: Number}
    },
    tags: [{
        topic: {type: String},
        score: {type: Number},
        posts: {type: Number}
    }]
})

module.exports = mongoose.model('Stackoverflow', StackoverflowSchema)