const router = require('express').Router();
const passport = require('passport');
const tasksController = require('../controllers/tasks');
const usersController = require('../controllers/users');

router.get('/api/test', (req, res)=> {
  res.send({ test: ' server: 3.11' });
});

router.route('/api/task')
	.get(tasksController.getTask)
	.post(tasksController.postTask);

router.route('/api/task/:id')
	.get(tasksController.getTask)
	.put(tasksController.putTask);

router.get('/api/tasks', tasksController.getTasks);
router.get('/api/tasks/:username', tasksController.getTasks);

router.route('/api/user')
	.post(usersController.postSignup);

router.get('/*', (req, res)=> {
	res.redirect('https://rickytranmer.github.io/patata');
});

module.exports = router;