const EPS = require('./EPS')

EPS.add_route(
  {
    methods: 'get',
    path: '/',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },
  {
    methods: 'get',
    path: '/exercice',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },
  {
    methods: 'get',
    path: '/profile',
    callback(req, res, next) {
      res.render('index', { title: 'Express' });
    }
  },
)

EPS.set(
  ['views','./views'],
)

EPS.run()