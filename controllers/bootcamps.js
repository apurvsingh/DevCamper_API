const Bootcamp = require('../models/Bootcamp');


//@description      Get all bootcamps
//@route            GET /api/v1/bootcamps
//@access            Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all boot camps',
        hello: req.hello
    });
}

//@description      Get single bootcamps
//@route            GET /api/v1/bootcamps/:id
//@access            Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Show bootcamp with id ${req.params.id}`
    });
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
    }catch (error) {
            res.status(400).json({
            success:false
        });
        console.log(error);
    }
}

//@description      Update bootcamp by id
//@route            PUT /api/v1/bootcamps/:id
//@access            Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated bootcamp with id ${req.params.id}`
    });
}

//@description      Delete bootcamp by id
//@route            DELETE /api/v1/bootcamps/:id
//@access            Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted bootcamp with id ${req.params.id}`
    });
}