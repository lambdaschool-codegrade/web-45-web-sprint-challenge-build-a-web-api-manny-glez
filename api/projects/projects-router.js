const express = require('express');
const Project = require('./projects-model');
const router = express.Router();

// [GET] /api/projects
router.get('/', async (req, res) => {
  try {
    const data = await Project.get()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json([])
  }
})

// [GET] /api/projects/:id
router.get('/:id', (req, res) => {
  Project.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ message: 'project not found' })
      }
    })
})

// [POST] /api/projects
router.post('/', (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        message: 'Error adding the project'
      })
    })
})

// [PUT] /api/projects/:id
router.put(':id', (req, res) => {
  const changes = req.body;
  Project.update(req.params.id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ message: 'could not find project' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        message: 'error updating'
      })
    })
})

// [DELETE] /api/projects/:id
router.delete('/:id', (req, res) => {
  Project.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'the project has been deleted' })
      } else {
        res.status(404).json({ message: 'no project found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error removing project'
      })
    })
})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', (req, res) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'error retrieving'
      })
    })
})

module.exports = router