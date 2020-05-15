'use strict';

const routes = [
    require('./routes/Users'),
    require('./routes/Products')
];

module.exports = function router(app, db) {
    return routes.forEach(route => {
        route(app, db);
    });
}