const router = require('express').Router();
const Workout = require('../models/workout.js');

//Post request for workouts
router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((workout) => {res.json(workout);}
    )
    .catch((err) => { res.json(err);}
    );
});

//Get all workouts
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration', },
      },
    },
  ])
    .then((workouts) => { res.json(workouts);}
    )
    .catch((err) => { res.json(err);}
    );
});

//Get request for workouts within range
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration',},
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((workouts) => { res.json(workouts);}
    )
    .catch((err) => { res.json(err);}
    );
});

//Find workouts by ID
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((workout) => {res.json(workout);})
      .catch((err) => {
        res.json(err);
      });
  });

//Delete a workout
router.delete('/api/workouts', ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => { res.json(true);})
    .catch((err) => { res.json(err);});
});

module.exports = router;
