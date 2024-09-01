import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";

// Your web app's Firebase configuration
const firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
};
// {
//     apiKey: "AIzaSyDfVidlXrb4FXnCfr79i8De2Vdeji1fOfk",
//     authDomain: "setita-53b15.firebaseapp.com",
//     projectId: "setita-53b15",
//     storageBucket: "setita-53b15.appspot.com",
//     messagingSenderId: "95095367458",
//     appId: "1:95095367458:web:7906f56cd0dfc973c6a77b",
//     measurementId: "G-0N5GKVPDGW"
// };
var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

const app = getApps().length !==0 
    ? getApps()[0]
    : admin.initializeApp({credential: admin.credential.cert(firebaseConfig)});

// export const cAnalytics = getAnalytics(app);

export const cFirestore = getFirestore(app)