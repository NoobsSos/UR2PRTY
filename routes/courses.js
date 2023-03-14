const express = require('express');
const { getCourses,
        createCourse,
        deleteCourse,
        updateCourse } = require('../controllers/course');

const router = express.Router({mergeParams: true});


router.route('/')
                .post(createCourse)
                .get(getCourses);

router.route('/:id')
                .put(updateCourse)
                .delete(deleteCourse);

module.exports = router;
