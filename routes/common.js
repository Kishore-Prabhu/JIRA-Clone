const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const requireAuth = require('../middleware/checkAuth');
const Project = mongoose.model('Project');
const User = mongoose.model('User');

router.get('/current_user', requireAuth, (req, res) => {
    const { name,  isAdmin } = req.user;
    res.json({
        name,
        isAdmin
    });
});

router.get('/affiliated', requireAuth, async (req, res, next) => {
        if(req.user.isAdmin){
            try {
                const users = await User.find({ createdBy: req.user._id });
                const admin = await User.findById(req.user._id);
                res.send([ admin, ...users ]);
            } catch(err){
                res.send(err);
            }   
        } else {
            try {
                const users = await User.find({ createdBy: req.user.createdBy });
                res.send(users);
            } catch(err){
                res.send(err);
            }
        }
})

router.get('/project/:projectId', requireAuth, async (req, res, next) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        res.send(project);
    } catch(err){
        res.send(err);
    }
})

router.put('/user/:userId', requireAuth, async (req, res, next) => {
	const { userId } = req.params;
	const { firstName, lastName, password } = req.body;

	try {
        const user = await User.findById(userId);
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
		const saved = await user.save();
		res.status(200).send(saved);
	} catch(err){
		res.status(500).send(err);
	}
});


router.get('/user/:userId', requireAuth, async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch(err){
        res.status(404).send(err);
    }
})

module.exports = router;
