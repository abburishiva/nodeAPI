var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user'),
    uc = new userController(),
    middleware = require('../utils/midleware/midleware');


router.get('/', middleware.auth, uc.find.bind(uc));
router.get('/:id', middleware.auth, uc.findOne.bind(uc));
router.post('/', uc.create.bind(uc));
router.post('/auth', uc.login.bind(uc));
router.put('/:id', middleware.auth, uc.update.bind(uc));
router.delete('/:id', middleware.auth, uc.delete.bind(uc));

module.exports = router;