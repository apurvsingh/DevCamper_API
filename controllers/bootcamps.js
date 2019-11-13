//@description      Get all bootcamps
//@route            GET /api/v1/bootcamps
//@access            Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all boot camps'
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
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Created a bootcamp'
    });
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