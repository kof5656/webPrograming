var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  host_id: {type: String},
  host_address: {type: String},
  host_location: {type: String},
  host_title: {type: String},
  master_id: {type: String},
  master_name: {type: String},
  master_email: {type: String},
  checkin: {type: String, required: true},
  checkout: {type: String, required: true},
  people: {type: Number, required: true},
  comment: {type: String},
  confirm: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;
