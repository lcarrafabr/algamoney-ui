export const environment = {
  production: true,
  apiUrl: 'https://carrafamoney-hmg-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('carrafamoney-hmg-api.herokuapp.com') ],
  tokenBlackListdRoutes: [ new RegExp('\/oauth\/token') ]
  //apiUrl: 'http://localhost:8080'
};
