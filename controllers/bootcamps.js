const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@description      Get all bootcamps
//@route            GET /api/v1/bootcamps
//@access            Public
exports.getBootcamps =asyncHandler( async (req, res, next) => {
    
        const bootcampData = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcampData.length,
            data: bootcampData
        });
});

//@description      Get single bootcamps
//@route            GET /api/v1/bootcamps/:id
//@access            Public
exports.getBootcamp =asyncHandler( async (req, res, next) => {
        const bootcampById = await Bootcamp.findById(req.params.id).lean();
        if(!bootcampById){
            return setResponseStatusForMissingBootcamp(req.params.id, next);
        }
        res.status(200).json({
            success: true,
            data: bootcampById
        });
});

//@description      Create new bootcamp
//@route            POST /api/v1/bootcamps/
//@access            Private
exports.createBootcamp = asyncHandler( async ( req, res, next) => {
    
        const newBootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
        success: true,
        msg: 'Created a bootcamp',
        data: newBootcamp
    });
    
});

//@description      Update bootcamp by id
//@route            PUT /api/v1/bootcamps/:id
//@access            Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    
        const bootcampById = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
        
        if(!bootcampById){
            return setResponseStatusForMissingBootcamp(req.params.id, next);
        }

        return res.status(200).json({
            success: true,
            data: bootcampById
        });
});

//@description      Delete bootcamp by id
//@route            DELETE /api/v1/bootcamps/:id
//@access            Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    
        bootcampById = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcampById){
            return setResponseStatusForMissingBootcamp(req.params.id, next);

        }

        return res.status(200).json({
        success: true,
        msg: `Deleted bootcamp with id ${req.params.id}`
    });
});

function setResponseStatusForMissingBootcamp (id, next){
    return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
}