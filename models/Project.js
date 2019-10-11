const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, required: true },
	abbreviation: { type: String, required: true },
	description: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	created: { type: Date, default: Date.now }
})

projectSchema.methods.addCollaborators = function(userIds){
	return new Promise((resolve, reject) => {
		for(id of userIds){
			this.collaborators.addToSet(id);
		}

		resolve(this.save());
	})
}

mongoose.model('Project', projectSchema);