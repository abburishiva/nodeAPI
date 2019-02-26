var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userCollection = mongoose.model('users', new Schema({
        name: { type: String },
        email: { type: String },
        password: { type: String },
        lastmoddate: { type: Date, default: new Date() }
    })),
    jwt = require('jsonwebtoken');

function UserModel() {
    this.userCollection = userCollection;
}

UserModel.prototype.find = function (params, c) {
    var obj = {};
    if (params.q) {
        obj = { name: new RegExp(params.q, 'i') }
    }
    this.userCollection.find(obj, c);
}

UserModel.prototype.findOne = function (id, c) {
    this.userCollection.findOne({ _id: id }, c);
}

UserModel.prototype.create = function (data, c) {
    var userInfo = new userCollection(data);
    userInfo.save(c);
}

UserModel.prototype.update = function (id, data, c) {
    this.userCollection.update({ _id: id }, data, { multi: true }, c);
}

UserModel.prototype.delete = function (id, c) {
    this.userCollection.remove({ _id: id }, c);
}

UserModel.prototype.login = function (data, c) {
    this.userCollection.find({ email: data.email, password: data.password }, function (err, result) {
        if (err) {
            c(err, null);
        } else if (result.length === 0) {
            c(null, { status: 404, message: 'record not found' });
        } else {
            var token = jwt.sign(result[0].toJSON(), 'myapp', { expiresIn: 60 * 5 });
            var userInfo = {
                token: token,
                details: result[0]
            }
            c(err, userInfo);
        }
    })
}


module.exports = UserModel;
