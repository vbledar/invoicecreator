/**
 * Created by vbledar on 14/10/15.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProductSchema = new schema({

    // unique product information
    name: String,
    price: Number,

    // product stock
    quantity: Number, // measured in kilos
    lastReplenished: {type: Date, default: Date.now()}

});

module.exports = mongoose.model('Product', ProductSchema);