const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Project = mongoose.model('Project');

const requireAuth = require('../middleware/checkAuth');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/project', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { title, type, abbreviation, description } = req.body;
	const newProject = new Project({ title, type, abbreviation, description, owner: req.user._id });


	if (!title || !type || !abbreviation || !description) {
		return res.status(422);
	}

	try {
		const saveProject = await newProject.save();
		res.send(saveProject);
	} catch (err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

router.post('/createUser', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { username, password, name } = req.body;
	const newUser = new User({ username, password, name,  isAdmin: false, createdBy: req.user._id });

	

	if (!username || !name ) {
		return res.status(422).send({ error: 'You must fill in all the required fields.' });
	}

	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(422).send({ error: 'Username already in use.' });
		}
	} catch (err) {
		next(err);
	}

	try {
		const saved = await newUser.save();
		res.status(200);
		res.send(saved);
	} catch (err) {
		console.log(err);
		console.log(`Internal Server Error, User.save(${JSON.stringify(newUser)})`);
	}
});



router.get('/projects', requireAuth, async (req, res, next) => {
	if (req.user.isAdmin) {
		try {
			const projects = await Project.find({ owner: req.user._id });
			res.send(projects);
		} catch (err) {
			res.send(err);
		}

	} else {
		try {
			const projects = await Project.find({ owner: req.user.createdBy });
			res.send(projects);
		} catch (err) {
			res.send(err);
		}
	}
})

router.delete('/deleteUsers', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { users } = req.body;

	try {
		const user = await User.remove({ _id: { $in: users } });
		res.status(200).send(user);
	} catch (err) {
		res.status(404).send(err);
	}
});

router.put('/project/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { title, type, abbreviation, description } = req.body;

	try {
		const project = await Project.findById(projectId);
		

		project.title = title;
		project.type = type;
		project.abbreviation = abbreviation;
		project.description = description;

		const saved = await project.save();
		res.status(200).send(saved);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/project/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;

	try {
		const remove = await Project.findByIdAndRemove(projectId);
		res.status(200).send(remove);
	} catch (err) {
		res.status(404).send(err);
	}
});

router.post('/addCollaborators/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { users } = req.body;

	try {
		const project = await Project.findById(projectId);
		const added = await project.addCollaborators(users);
		res.status(200).send(project);
	} catch (err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

module.exports = router;