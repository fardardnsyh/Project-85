const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    professionalSummary: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    linkedIn: { type: String, required: true },
    gitHub: { type: String, required: true },
    portfolio: { type: String, required: true },
    location: { type: String, required: true }
});

const educationSchema = new mongoose.Schema({
    instituteName: { type: String },
    degree: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String }
});

const projectSchema = new mongoose.Schema({
    projectTitle: { type: String },
    gitHubURL: { type: String },
    deployedURL: { type: String },
    teamSize: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    projectDescription: { type: String },
    features: [String],
    areasOfResponsibility: [String],
    techStack: [String]
});

const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String, },
    organizationalName: { type: String, },
    companyWebsite: { type: String },
    startDate: { type: Date, },
    endDate: { type: Date },
    areasOfResponsibility: [String]
});

const certificationSchema = new mongoose.Schema({
    certificateName: { type: String },
    certificateURL: { type: String },
    issuingOrganization: { type: String }
});

const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, },
    title: { type: String, required: true },
    sections: {
        personalInfo: personalInfoSchema,
        education: [educationSchema],
        projects: [projectSchema],
        workExperience: [experienceSchema],
        skills: [String],
        certifications: [certificationSchema]
    }
});

module.exports = mongoose.model('resume', resumeSchema);
