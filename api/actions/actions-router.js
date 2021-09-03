const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

// [GET] /api/actions
router.get('/', (req, res) => {
  Action.get(req.query)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messgae: 'Error getting actions'
      })
    })
})

// [GET] /api/actions/:id
router.get('/:id', (req, res) => {
  Action.get(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ messgae: 'action not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messgae: 'Error getting action'
      })
    })
})

// [POST] /api/actions
router.post('/', (req, res) => {
  Action.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messgae: 'error adding action'
      })
    })
})

// [PUT] /api/actions/:id
router.put('/:id', (req, res) => {
  const changes = req.body
  Action.update(req.params.id, changes)
    .then(action => {
      if (action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ messgae: 'action not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messgae: 'error updating'
      })
    })
})

// [DELETE] /api/actions/:id
router.delete('/:id', (req, res) => {
  Action.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ messgae: 'deleted' })
      } else {
        res.status(404).json({ messgae: 'not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messgae: 'error removing'
      })
    })
})

module.exports = router
