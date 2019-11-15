const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

//@description      Get all bootcamps
//@route            GET /api/v1/bootcamps
//@access            Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcampData = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcampData.length,
            data: bootcampData
        });
    } catch (err) {
        res.status(404).json({
            success:false
        });
    }
};

//@description      Get single bootcamps
//@route            GET /api/v1/bootcamps/:id
//@access            Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcampById = await Bootcamp.findById(req.params.id).lean();
        if(!bootcampById){
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: bootcampById
        });
    } catch (err) {
        next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));

    }
}

//@description      Create new bootcamp
//@route            POST /api/v1/bootcamps/
//@access            Private
exports.createBootcamp = async ( req, res, next) => {
    try {
        const newBootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
        success: true,
        msg: 'Created a bootcamp',
        data: newBootcamp
    });
    }catch (err) {
            res.status(400).json({
            success:false
        });
        console.log(err);
    }
}

//@description      Update bootcamp by id
//@route            PUT /api/v1/bootcamps/:id
//@access            Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcampById = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
        
        if(!bootcampById){
            return res.status(400).json({success:false});
        }

        return res.status(200).json({
            success: true,
            data: bootcampById
        });
    } catch (err) {
        return res.status(400).json({
            success:false
        })
    }
}

//@description      Delete bootcamp by id
//@route            DELETE /api/v1/bootcamps/:id
//@access            Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        bootcampById = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcampById){
            return res.status(400).json({success:false});
        }

        return res.status(200).json({
        success: true,
        msg: `Deleted bootcamp with id ${req.params.id}`
    });
    } catch (err) {
        return res.status(400).json({success:false});
    }
}