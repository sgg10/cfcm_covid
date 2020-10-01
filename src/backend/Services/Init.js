import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC1QbFRY2s0bx7hoGummR04q1O43zsSGnU',
  authDomain: 'reservas-cfcm.firebaseapp.com',
  databaseURL: 'https://reservas-cfcm.firebaseio.com',
  projectId: 'reservas-cfcm',
  storageBucket: 'reservas-cfcm.appspot.com',
  messagingSenderId: '934770564113',
  appId: '1:934770564113:web:5f38f92f2949b00dd3a5b0',
  measurementId: 'G-WERCEBNQDC'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
