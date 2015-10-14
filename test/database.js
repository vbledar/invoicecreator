/**
 * Created by vbledar on 14/10/15.
 */
// library requirements
var mongoose = require('mongoose'),
    mongooseMock = require('mongoose-mock'),
    chai = require('chai'),
    expect = require('chai').expect,
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai");

// library configurations
chai.use(sinonChai);

// database server configuration
var server = 'localhost';
var port = '27017';
var schema = 'invoice';

// load application model
var Customer = require('../model/Customer');

describe("Checking database connection", function() {

    var customer = null;

    it("Should connect with database", function(done) {

        mongoose.connect("mongodb://" + server + ":" + port + "/" + schema);
        done()

    })

    describe("Checking CRUD operations", function() {

        it("Can create customer", function(done) {
            var customerProperties = {
                name: "Test Test",
                afm: "123456789012",
                phone: "12345678",
                email: "aaa@bbb.ccc",
                address1: "address 1",
                address2: "address 2",
                postal: "12345",
                city: "city",
                country: "country"
            }

            var customer = new Customer(customerProperties);
            customer.save(function(err, res) {
                if (err) {
                    done(err);
                }

                done();
            });
        });

        it("Can find customer", function(done) {

            Customer.find({name: 'Test Test'}, function(err, res) {
                if (err) {
                    done(err);
                }

                expect(res.length).to.be.equal(1);
                expect(res[0].afm).to.be.equal('123456789012');
                expect(res[0].afm).to.not.be.equal('123456789013');
                done();
            })

        })

        it("Can update customer", function(done) {

            Customer.update({name: 'Test Test'}, {$set: {afm: '123456789013'}}, function(err, res) {
                if (err) {
                    done(err);
                }

                expect(res.ok).to.be.equal(1);
                expect(res.nModified).to.be.equal(1);
                done();
            });
        });

        it("Can delete customer", function(done) {
            Customer.remove({}, function(err, res) {
                if (err) {
                    done(err);
                }

                done();
            });
        });
    });
});


describe("Checking database disconnection", function() {

    it("Should disconnect from database", function(done) {
        mongoose.disconnect(function() {
            done();
        })
    })

})

describe("Checking validation operations on customer", function() {

    var Customer;

    beforeEach(function() {
        console.log("Mocking customer...");
        Customer = proxyquire('../model/Customer', {'mongoose': mongooseMock})
        console.log("Mocking customer...done");
    })

    it("Should create customer", function(done) {
        var callback = sinon.spy();
        var customer = Customer.createAndSave({ name: 'testcustomer', afm: '123456789012' }, callback);
        expect(customer.save).calledOnce;
        done();
    })


})