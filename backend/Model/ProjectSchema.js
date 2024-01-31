const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  image: String,
  content: String,
  name: String,

  
});

const ProjectModel = mongoose.model('project', ProjectSchema);

module.exports = ProjectModel;
