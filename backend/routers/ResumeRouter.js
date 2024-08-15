const express = require('express');
const ResumeModel = require('../models/ResumeModel');


const resumeRouter = express.Router();


// Get resumes 
resumeRouter.get('/', async (req, res) => {
    try {
        const resumes = await ResumeModel.find({ user: req.user.userId });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




// create resume 
resumeRouter.post("/", async (req, res) => {
    const { title, sections } = req.body;
    try {
        const newResume = new ResumeModel({
            user: req.user.userId,
            title,
            sections
        });

        const resume = await newResume.save();
        res.json(resume);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Edit Resume
resumeRouter.put('/:id', async (req, res) => {
    const { title, sections } = req.body;
    try {
        let resume = await ResumeModel.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        if (resume.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        resume.title = title;
        resume.sections = sections;

        resume = await ResumeModel.findByIdAndUpdate(req.params.id, { $set: resume }, { new: true });
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Resume
resumeRouter.delete('/:id', async (req, res) => {


    try {
        let resume = await ResumeModel.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });


        if (resume.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await ResumeModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resume removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = resumeRouter;