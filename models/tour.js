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
    date: { type: Date, default: Date.now },
    meta: {
        description: String,
        youtube: String,
        featured: String,
        gallery: String,
        transport: String,
        highlight: String,
        itinerary: String,
        question: String,
        more: String
    }
});

module.exports = mongoose.model('Tour', tourSchema);