var mongoose = require('mongoose');
var Schema = mongoose.Schema;;

var tourSchema = new Schema({
    name: String,
    status: String,
    age: String,
    style: String,
    destination: String,
    start: String,
    end: String,
    day: String,
    night: String,
    pricebase: String,
    priceperson: String,
    date: {type: Date, default: Date.now },
    meta: {
        youtube: String,
        featured: String,
        gallery: String,
        transport: String,
        description: String,
        highlight: String,
        itinerary: String,
        qa: String,
        more: String
    }
});

module.exports = mongoose.model('Tour', tourSchema);