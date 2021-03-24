const _ = require('lodash');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { Visit } = require('../models/visit');

const Getters = require('../plugins/getters');
// Sortable Attributes
const sortableAttributes = ['created_at', 'sales', 'price'];
// Validate Sort Key
const validSort = val => (sortableAttributes.indexOf(val) !== -1 ? val : false)

const handleSpecialChars = val =>
	val.replace(/[!@#$%^&*(),.?":{}|<>+-]/, t => `\\${t}`)

module.exports = {
	async getAll(req, res) {
    const filters = Getters.build(req.query, {
      q: [
        {
          extractor: "string",
          resolver: "search",
          key: "visitor.name"
				},
        {
          extractor: "string",
          resolver: "search",
          key: "visitor.job"
				},
        {
          extractor: "string",
          resolver: "search",
          key: "visitor.company"
        }
      ],
      action: {
				extractor: "multiple",
				resolver: "nestring",
				key: "actions.name"
      }
    });
    const page = Getters.extract.int(req.query.page);
    const limit = Getters.extract.int(req.query.limit) || 5;
    const sort = Getters.extract.string(req.query.sort);
    const arrange = Getters.resolve.stringRadio(
      req.query.arrange,
      "desc",
      -1,
      1
    );
    const select = Getters.extract.multiple(req.query.select);
    const sorter = {};
    if (sort) sorter[sort] = arrange;
		const visits = await Visit.find(filters)
      .select(select)
      .skip(page * limit)
      .limit(limit)
      .sort(sorter);

    const count = await Visit.find(filters);
		const pages = Math.ceil(count.length / limit, 10);

		const result = {
			visits,
      page,
			limit,
      pages,
			filters
    };
    return res.send(result);
	},

	async add(req, res) {
		const token = req.header('authorization');
		if (!token) {
			return res.status(401).send('Unauthorized');
		}
		const decoded = jwt.verify(token, config.jwtPrivateKey)
		visit = new Visit({ ...req.body, added_by: decoded })
		await visit.save()
    return res.send(visit)
	},

	// Per One
	async getOne(req, res) {
		if (!req.params.id || !req.params.id.length)
			return res.status(400).send('Visit number is required');

		const visit = await Visit.findOne({ _id: req.params.id })
    if (!visit) {
			return res.status(404).send('Visit Not Found');
		}
		res.send(visit)
  },

	async update(req, res) {
		// const { error } = ValidateVisit(req.body, true)
		// if (error) return res.status(400).send(error.details[0].message)
		const updated = await Visit.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: req.body
			},
			{
				new: true
			}
		);
		if (!updated) {
			return res.status(404).send('Visit Not Found');
		}
		return res.send(updated)
  },
	async deleteVisit(req, res) {
		const job = await Visit.findById(req.params.id)
    if (!job) {
			return res.status(404).send('Visit Not Found');
		}
		Visit.deleteOne({ _id: req.params.id }, function(err) {
			return res.send('Deleted');
		})
  }
}
