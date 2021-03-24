const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../../models/user');
const config = require('../../config');
const picks = [
	"_id",
	"name",
	"email",
	"roles",
	"avatar",
	"points",
	"auth_type",
	"social",
	"addresses",
	"phone",
	"blocked"
]
const controller = {
	async post(req, res) {
		const { error } = validate(req.body)
		if (error) return res.status(400).send(error.details[0].message)

		let user = await User.findOne({
			email: req.body.email,
			auth_type: 'local'
		}).select([...picks, 'password'].join(' '))
		if (!user) return res.status(400).send('Invalid email or password.');

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(400).send('Invalid email or password.');

		const token = await user.generateAuthToken()
		return res.send({ ..._.pick(user._doc, picks), token })
	}
}

function validate(req) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};

	return Joi.validate(req, schema)
}

module.exports = controller
