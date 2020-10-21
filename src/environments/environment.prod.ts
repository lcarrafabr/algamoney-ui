export const environment = {
  production: true,
  apiUrl: 'https://carrafamoney-hmg-api.herokuapp.com',

  tokenWhitelistedDomains: [ /carrafamoney-hmg-api.herokuapp.com/ ],
  tokenBlackListdRoutes: [ /\/oauth\/token/ ]
  //apiUrl: 'http://localhost:8080'
};
