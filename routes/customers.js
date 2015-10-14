/**
 * Created by vbledar on 14/10/15.
 */
var express = require('express');
var router = express.Router;

// GET list of customers
router.get('/', function(req, res, next) {

    res.send("OK for list of customers");

});

router.post('/', function(req, res, next) {

    res.send("OK for create customer");

});

router.put('/:id', function(req, res, next) {

    res.send("OK for update customer");

});

router.delete('/:id', function(req, res, next) {

    res.send("OK for delete customer");

})