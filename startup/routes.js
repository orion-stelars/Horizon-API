const express = require('express');
const bodyParser = require('body-parser');
const user = require('../routes/user');
// const address = require('../routes/user/address');
const auth = require('../routes/auth');
const visit = require('../routes/visit');
const error = require('../middleware/error');
const cors = require('cors');

const formData = require('express-form-data');
const os = require('os');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next()
	})
	app.use(cors());
	app.options("*", cors());
	app.use(cors());
	app.use(express.json());
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
  app.use('/api/users', user)
  // app.use('/api/address', address)
  app.use('/api/auth', auth)
  app.use('/api/visit', visit)
  app.use(error)
}
