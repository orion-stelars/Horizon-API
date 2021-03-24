const config = require('../config');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
require('moment-timezone');

const visits = new mongoose.Schema({
	visitor: {
		type: Array,
		default: [{ name: 'Jhon Doe', job: '', company: '' }]
	},
	actions: {
		type: Array,
		default: []
	},
	reason: {
		type: String,
		default: 'Say hello'
	},
	created_at: {
		type: Date,
		default: moment.tz('UTC').toDate()
	},
	added_by: {
		type: Object,
		required: true
	}
})

const Visit = mongoose.model('visits', visits)
exports.Visit = Visit
