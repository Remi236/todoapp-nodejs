const express = require('express');
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get('/', todoController.get);
// query parameters
router.get('/search', todoController.search);

router.get('/view/:id', todoController.getDetail);
// method post
router.post('/add', todoController.add);
// method put
router.put('/:id', todoController.update);
// method delete
router.delete('/:id', todoController.delete);

module.exports = router;