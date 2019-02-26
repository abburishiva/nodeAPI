var jwt = require('jsonwebtoken');

exports.auth = function(req,res,next){
    if(req.headers['x-access-token']){
        jwt.verify(req.headers['x-access-token'], 'myapp', function(err, decoded) {
            if(err) res.send('invalid token');
            next();
          });
    }else{
        res.send({message:'Token not provided'});
    }
    
}