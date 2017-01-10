const routes = require('express').Router();

const highlights = require('./highlights');
const highlight = require('./highlight');


routes.get('/', (req, res) => {
    res.status(200).json({"message": "this is a message"});
});
routes.get('/highlights', highlights);
routes.get('/highlight/:id', highlight);

module.exports = routes
