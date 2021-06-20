// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SOCKET_URL: 'localhost:3000',
  firebaseConfig: {
    apiKey: "AIzaSyAzwuIx03ooL2cjjkTVxxqoA471kH1eaGE",
    authDomain: "chat-a41f1.firebaseapp.com",
    projectId: "chat-a41f1",
    storageBucket: "chat-a41f1.appspot.com",
    messagingSenderId: "743694808492",
    appId: "1:743694808492:web:6e97e6565d944955ea3609"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
