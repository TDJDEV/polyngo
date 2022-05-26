import { EPS }        from './EPS/index.js';
import cookieParser   from 'cookie-parser';
import logger         from 'morgan';
import cookieSession  from 'cookie-session';
import { addUser, delUser, getUser } from './tables.js';

EPS.use(
  logger('dev'),
  cookieParser(),
  cookieSession({
    name: 'session',
    keys: ["hello_my_proud_future_polyglot"],
  
    // Cookie Options
    maxAge: 60 * 60 * 1000 //  1 hours
  })
)

EPS.route(
  // Pages
  {
    method: 'get',
    path: '/',
    callback(req, res, next) {
      req.session.views = (req.session.views || 0) + 1
      console.log(req.session)
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

  // API

  {
    method: 'post', // create
    path: '/api/:user/:data/:id',
    callback(req, res, next) {
      console.log("/api - post => ", {
        params: req.params,
        autorised: req.params.user === req.session.user,
        data: req.body
      })
      addUser(req.body)
      res.render('index', { title: 'Express' });
    }
  },
  {
    method: 'get', // read
    path: '/api/:user/:data/:id',
    callback(req, res, next) {
      console.log("/api - get => ", {
        params: req.params,
        autorised: req.params.user === req.session.user,
        data: req.query
      })
      getUser(req.query.id, res)
      res.render('index', { title: 'Express' });
    }
  },
  {
    method: 'put', // update
    path: '/api/:user/:data/:id',
    callback(req, res, next) {
      console.log("/api - put => ", {
        params: req.params,
        autorised: req.params.user === req.session.user,
        data: req.body
      })
      res.render('index', { title: 'Express' });
    }
  },
  {
    method: 'delete', // delete
    path: '/api/:user/:data/:id',
    callback(req, res, next) {
      console.log("/api - delete => ", {
        params: req.params,
        autorised: req.params.user === req.session.user,
        data: req.body
      })
      delUser(req.body.id, res)
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
