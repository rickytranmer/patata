const router = require('express').Router();
const tasksController = require('../controllers/tasks');

router.get('/api/test', (req, res)=> {
  res.send({ test: 'api success' });
});

router.route('/api/task')
	.get(tasksController.getTask)
	.post(tasksController.postTask);

router.get('/api/tasks', tasksController.getTasks);

module.exports = router;