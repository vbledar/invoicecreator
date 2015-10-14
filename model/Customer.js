/**
 * Created by vbledar on 14/10/15.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CustomerSchema = new schema({

    // unique customer information
    name: String,
    afm: String,

    // contact details
    phone: String,
    email: String,

    // address information
    address1: String,
    address2: String,
    postal: String,
    city: String,
    country: String

});

module.exports = mongoose.model("Customer", CustomerSchema);