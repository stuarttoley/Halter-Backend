var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CowSchema = new Schema({
  
    collarId: { type: Number, default: 0},
    cowNumber: Number,
    collarStatus: String,
    Lastlocation: Object
  
});

module.exports = mongoose.model('Cow', CowSchema);