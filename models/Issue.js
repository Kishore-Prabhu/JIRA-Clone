const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
	issueType: { type: String, required: true },
	summary: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, default: 'To Do' },
	priority: { type: String, default: 'Medium' },
	assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	attachments: [{ data: Buffer, contentType: String }],
	reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
})

mongoose.model('Issue', issueSchema);