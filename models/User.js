var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
  manager: {type: Boolean, default: false},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, index: true, unique: true, trim: true},
  password: {type: String},
  createdAt: {type: Date, default: Date.now},
  facebook: {id: String, token: String, photo: String}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

//패스워드 암호화
schema.methods.generateHash = function(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

//암호화된 패스워드로 로그인
schema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', schema);

module.exports = User;
