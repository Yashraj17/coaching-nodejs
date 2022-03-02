AdminModel = require('../models/AdminModel')
module.exports.isAuthorized = function (req,res,next) {
    AdminModel.findById(req.session.user_id).exec(function (error,admin) {
        if(error){
            return(error);
        }
        else{
            if (admin===null) {
                var err = new Error('not authorized go back')
                err.status = 401;
                return next(err)
            } else {
                return next();
            }
        }
    })
}