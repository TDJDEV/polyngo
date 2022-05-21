const EPS = require('./EPS')

EPS.add_route(
  {
    method: 'get',
    path: '/',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },
  {
    method: 'get',
    path: '/exercice',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },
  {
    method: 'get',
    path: '/profile',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },

  // Ressources
  {
    method: 'use',
    path: '/',
    callback: "./ressouces"
  },
)

EPS.set(
  ['views','./views'],
)

EPS.run()