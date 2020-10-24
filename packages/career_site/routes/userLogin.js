const express = require('express')
const router = express.Router()

// const axios = require('axios')

const User = require('../models/User');
const Candidate = require('../models/Candidate')
const Recruiter = require('../models/Recruiter')

const { userLoginRule, userUpdatePasswordRule, validate } = require('./inputValidator');
const createSessionKey = require('./sessions');


router.post("/register", userLoginRule(), validate, async (req, res) => {
    try {
        let checkUser = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if (checkUser) {
            return res.status(400).json({ message: `The user ${req.body.email} already exists` });
        }

        let user = new User(req.body);
        await user.save();

        const sessionKey = createSessionKey(user.email)
        const userObj = {
            email: req.body.email,
            fullName: req.body.fullName,
            sessionKey: sessionKey
        }

        if (user.userType === "C") {
            try {
                // await axios.post('/candidate?admin=adminPass' , userObj, {proxy: {port:3000}} );
                const candidate = new Candidate(userObj)
                await candidate.save()
            } catch (error) {
                return res.status(500).json({ message: error })
            }
        }
        else if (user.userType === "R") {
            try {
                // await axios.post('/recruiter?admin=adminPass' , userObj, {proxy: {port:3000}} );
                const recruiter = new Recruiter(userObj)
                await recruiter.save()
            } catch (error) {
                return res.status(500).json({ message: error })
            }
        }

        res.json({ message: `User ${req.body.email} registered`, sessionKey: sessionKey });

    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Ask for old password and then update new password
router.put("/updatePassword", userUpdatePasswordRule(), validate, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if (!user) {
            return res.status(400).json({ message: `The user ${req.body.email} does not exist` });
        }
        if (!user.comparePassword(req.body.oldPassword)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }

        // Old password is correct, delete the record and create a new one
        await User.deleteOne({ email: req.body.email, userType: req.body.userType });

        let userNew = new User(req.body);
        await userNew.save();

        res.json({ message: `Password of User ${req.body.email} changed successfully` });

    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post("/login", userLoginRule(), validate, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if (!user) {
            return res.status(400).json({ message: `The user ${req.body.email} does not exist` });
        }
        // user.comparePassword(req.body.password, (err, match) => {
        if (!user.comparePassword(req.body.password)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }

        const sessionKey = createSessionKey(user.email)
        const userObj = {
            email: req.body.email,
            sessionKey: sessionKey
        }
        
        if (user.userType === "C") {
            try {
                // await axios.patch('/candidate/updateSessionKey?admin=adminPass', userObj, { proxy: { port: 3000 } });
                await Candidate.updateOne({email: userObj.email}, {sessionKey: userObj.sessionKey})
            } catch (error) {
                return res.status(500).json({ message: error })
            }
        }
        else if (user.userType === "R") {
            try {
                // await axios.patch('/recruiter/updateSessionKey?admin=adminPass' , userObj, {proxy: {port:3000}} );
                await Recruiter.updateOne({email: userObj.email}, {sessionKey: userObj.sessionKey})
            } catch (error) {
                return res.status(500).json({ message: error })
            }
        }

        res.json({ message: "Login Succeeded!", sessionKey: sessionKey });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router