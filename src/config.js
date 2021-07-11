export const firebaseConfig = {
  apiKey: "AIzaSyAeETETep1aJkJnuX7pYHxd5msmfolooCg",
  authDomain: "react-app-50ed0.firebaseapp.com",
  databaseURL: "https://react-app-50ed0-default-rtdb.firebaseio.com",
  projectId: "react-app-50ed0",
  storageBucket: "react-app-50ed0.appspot.com",
  messagingSenderId: "471881041644",
  appId: "1:471881041644:web:6fd18b2a4f3b0e9eddc7c9",
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;
export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
