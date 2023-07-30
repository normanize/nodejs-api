const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const { authMiddleware, roleMiddleware } = auth;

const usersController = require('../controllers/usersController');

router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.post('/', [authMiddleware, roleMiddleware(['admin'])], usersController.create);
router.put('/:id', [authMiddleware, roleMiddleware(['admin'])], usersController.update);
router.delete('/:id', [authMiddleware, roleMiddleware(['admin'])], usersController.remove);

module.exports = router;