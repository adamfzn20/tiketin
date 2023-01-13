const {expressjwt: jwt} = require('express-jwt');

function authJwt() {
  const api = process.env.API_URL;

  return jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256']
  }).unless({
    path: [
      {url: `${api}/admins/`, methods: ['GET', 'OPTIONS']},
      {url: `${api}/admins/login`, methods: ['POST', 'OPTIONS']},
      {url: `${api}/admins/register`, methods: ['POST', 'OPTIONS']},
      {url: /\/tmp\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
    ]
  })
};

module.exports = authJwt 

