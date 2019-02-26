var userModel = require('../models/user'),
    um = new userModel();

function UserController() {

}

UserController.prototype.find = function (req, res) {
    um.find(req.query, function (err, data) {
        res.send(data);
    });
};
UserController.prototype.findOne = function (req, res) {
    um.findOne(req.params.id, function (err, data) {
        res.send(data);
    });
};

UserController.prototype.create = function (req, res) {
    um.create(req.body, function (err, data) {
        res.send(data);
    });
};

UserController.prototype.update = function (req, res) {
    um.update(req.params.id, req.body, function (err, data) {
        res.send(data);
    });
};

UserController.prototype.delete = function (req, res) {
    um.delete(req.params.id, function (err, data) {
        res.send(data);
    });
};


UserController.prototype.login = function (req, res) {
    um.login(req.body, function (err, data) {
        res.send(data);
    });
};








module.exports = UserController;