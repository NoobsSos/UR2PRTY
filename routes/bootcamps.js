const express = require('express');
const { getBootcamps,
        getBootcamp,
        createBootcamp,
        updateBootcamp,
        deleteBootcamp,
        getBootcampInRadius } = require('../controllers/bootcamps')

// Include other routes
const courseRouter = require('./courses');


const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);


router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);
module.exports = router;


// NEVER **** UP
