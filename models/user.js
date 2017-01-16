var mongoose = require('mongoose');
var mongooseFindOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
        username: String,
        amazonId: String,
        highlights: [String]
});

userSchema.plugin(mongooseFindOrCreate);

module.exports = mongoose.model('User', userSchema);

