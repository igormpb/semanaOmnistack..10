const mongoose = require('mongoose');
const PointSchema = require('./utlis/pointSchema');

const devsSchema = new mongoose.Schema({
    name: String,
    github_user: String,
    bio: String,
    techs: [String],
    avatar_url: String,
    location: {
        type: PointSchema,
        index:'2dsphere',
    },
});

module.exports = mongoose.model("Dev", devsSchema);
