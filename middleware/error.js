const ErrorResponse = require('../utils/errorResponse')

const errorHandler = ( err, req, res, next) => {
    
    let error = {...err};
    error.message = err.message;
    
    
    //Log to console for dev
    console.log(err);

    //Mongoose bad ObjectId
    if(err.name ==='CastError'){
        const errMessage = `Resource not found with id ${err.value}`;
        error = new ErrorResponse(errMessage, 404);
    }

    //Mongoose duplicate key
    if(err.code ===11000){
        const errMessage = `Id already exists. Duplicate field value used`;
        error = new ErrorResponse(errMessage, 400);
    }

    //MongooseValidationError
    if(err.name==='ValidationError'){
        const errMessage = Object.values(err.errors).map(val=>val.message);
        error = new ErrorResponse(errMessage, 400);
    }

    res.status(error.statusCode || 500).json({success:false, error:error.message||'Some error occured'});
}

module.exports = errorHandler;