const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get Scorecard'})
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'Create Scorecard'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Update Scorecard ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Delete Scorecard ${req.params.id}`})
})

module.exports = router