const router = require('express').Router()


//MODELS
const Car = require('../models/Car.model')


//ROUTES
//All cars page
router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.find({})
        res.render('cars', { cars })
    }
    catch (err) {
        next(err)
    }
})

//Filtered all cars page
router.post('/', async (req, res, next) => {
    try {
        const filter = req.body.sort
        const order = (filter === 'ZA' || filter === "favDesc") ?  -1 : 1
        let cars = {}
        if(filter === 'ZA' || filter === "AZ" ) 
             cars = await Car.find({}, null, { sort: { name: order } })
        else
            cars = await Car.find({}, null, { sort: { likes: order } })
        res.render('cars', {cars})
    }
    catch (err) {
        next(err)
    }
})

module.exports = router