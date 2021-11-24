const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

module.exports = app => {
    app.set('trust proxy', 1)
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true
            }, // ADDED code below !!!
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basic-auth',

                // ttl => time to live of the session
                ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
            })
        })
    )

    //This checks on every page if there's an user logged in, if there is, it stores it on the local variables
    app.use((req, res, next) => {
        if (req.session.loggedUser) {
          res.locals.session = req.session
        }
        next()
      })
}


