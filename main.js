import { EPS }        from './EPS/index.js';
import cookieParser   from 'cookie-parser';
import logger         from 'morgan';
import cookieSession  from 'cookie-session';

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
