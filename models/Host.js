var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  master_name: {type: String},
  master_email: {type: String},
  master_id: {type: String},
  title: {type: String, required: true},
  location: {type: String, required: true},
  address: {type: String, required: true},
  detail: {type: String, required: true},
  price: {type: Number, required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

var Host = mongoose.model('Host', schema);

module.exports = Host;
