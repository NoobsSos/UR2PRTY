const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')


// @desc        Get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamp/:bootcampId/courses
// @access      Public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.bootcampId) {
        query = Course.find({
            bootcamp: req.params.bootcampId
        });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    // pagination result
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;
    const total = await Course.countDocuments();

    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
        pagination.prev = {
        page: page - 1,
        limit: limit
      }
    }

    res.status(200).json({success: true, count: courses.length, pagination: pagination, data: courses});
});
