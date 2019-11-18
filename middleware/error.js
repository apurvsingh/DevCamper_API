const ErrorResponse = require('../utils/errorResponse')

const errorHandler = ( err, req, res, next) => {
    
    let error = {...err};
    error.message = err.message;
    
    
    //Log to console for dev
    console.log(err.stack.red);

    //Mongoose bad ObjectId
    if(err.name ==='CastError'){
        const errMessage = `Resource not found with id ${err.value}`;
        error = new ErrorResponse(errMessage, 404);
    }

    res.status(error.statusCode || 500).json({success:false, error:error.message||'Some error occured'});
}

module.exports = errorHandler;