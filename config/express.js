const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('express-handlebars');

const authMiddleware = require('../middlewares/auth');


module.exports = (app) => {

    app.engine('hbs', hbs({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());

    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('>>>>>', req.method, req.url);
            if (req.user) {
                console.log('Known user ', req.user.username);
            }
        }
        next()
    })

    //TODO add storage and middlewares
}