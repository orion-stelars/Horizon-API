const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router()
const appController = require('../controllers/app');

const _ = require('lodash');

function getSums(data) {
	const mapped = data.map(i => ({
		...i,
		key: `${i.code}${i.color}${i.length}`
	}))
  const unified = _.groupBy(mapped, 'key');
	const result = []
  Object.keys(unified).forEach(i => {
		let count = _.sumBy(unified[i], j => j.count)
    let weight = _.sumBy(unified[i], j => j.weight)
    result.push({ ...unified[i][0], count, weight })
  });
	return result;
}

router.get('/test', (req, res) => {
	const data = [
		{
			created_at: '2020-10-20T12:14:16.000Z',
			_id: '5f8ed4ab8d83d79c7f69d627',
			barcode: '120200923124033',
			code: 'PS-4820',
			color: 'ذهبي',
			type: 'مواسير',
			finish: 'ذهبي ترتله',
			sales: 'Mf فضى',
			length: 6,
			count: 440,
			piston_number: 4,
			weight: 3000,
			shift_number: 1,
			request_number: 'A-2',
			__v: 0
		},
		{
			created_at: '2020-10-20T12:14:16.000Z',
			_id: '5f8ed4b98d83d79c7f69d628',
			barcode: '120200923124033',
			code: 'PS-4820',
			color: 'ذهبي',
			type: 'مواسير',
			finish: 'ذهبي ترتله',
			sales: 'Mf فضى',
			length: 6,
			count: 440,
			piston_number: 4,
			weight: 3000,
			shift_number: 1,
			request_number: 'A-2',
			__v: 0
		},
		{
			created_at: '2020-10-21T11:54:45.000Z',
			_id: '5f902c844ff3acb5cebfa259',
			barcode: '120200923124033',
			code: 'PS-4820',
			color: 'ذهبي',
			type: 'مواسير',
			finish: 'ذهبي ترتله',
			sales: 'Mf فضى',
			length: 6.5,
			count: 440,
			piston_number: 4,
			weight: 3000,
			shift_number: 1,
			request_number: 'A-2',
			__v: 0
		},
		{
			created_at: '2020-10-21T11:54:45.000Z',
			_id: '5f902e934ff3acb5cebfa25a',
			barcode: '120200923124033',
			code: 'PS-4820',
			color: 'ذهبي',
			type: 'مواسير',
			finish: 'ذهبي ترتله',
			sales: 'Mf فضى',
			length: 6.5,
			count: 440,
			piston_number: 4,
			weight: 3000,
			shift_number: 1,
			request_number: 'A-2',
			__v: 0
		}
	];

	return res.send(getSums(data))
});

// Get
router.get('/', appController.getApp)

// Register
router.post('/', auth('admin'), appController.register)

// Update
router.put('/', auth('admin'), appController.update)

// Add Background
router.put('/background', auth('admin'), appController.addBackground)

// Get Background
router.get('/background', appController.getBackground)

// Delete Background
router.delete('/background', auth('admin'), appController.removeBackground)

module.exports = router
