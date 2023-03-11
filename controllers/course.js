const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')


// @desc        Get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamp/:bootcampId/courses
// @access      Public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    const reqQuery = {...req.query};

    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeField and delete them
    removeFields.forEach(param => delete reqQuery[param]);



    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Course.find(JSON.parse(queryStr));

    // Select Fields

    if(req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;
    const total = await Course.countDocuments();


    query = query.skip(startIndex).limit(limit);

    if(req.params.bootcampId) {
        query = Course.find({
            bootcamp: req.params.bootcampId
        });
    } else {
        query = Course.find();
    }

    const courses = await query;

    // pagination result
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
