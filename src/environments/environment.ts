// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Api url
  API_URL: 'https://loyer-api.herokuapp.com/api/',
  // Api test url 
  API_URL_TEST: 'http://192.168.11.118:5000/api/',
  // Api access key
  API_ACCESS_KEY: 'take$the#whole!bull',
  // Api version
  API_VERSION: 'v1/',
  // Application version
  APP_VERSION: 'Beta1.3(Dev)'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.