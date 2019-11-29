import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp ({
    apiKey: "AIzaSyDZ6uwrKaYDcwPmCT2LENUYadWCOkW_VfI",
    authDomain: "todoist-react-clone-2d6e6.firebaseapp.com",
    databaseURL: "https://todoist-react-clone-2d6e6.firebaseio.com",
    projectId: "todoist-react-clone-2d6e6",
    storageBucket: "todoist-react-clone-2d6e6.appspot.com",
    messagingSenderId: "1073185870222",
    appId: "1:1073185870222:web:597e9aab1b2ce3d22914df"
});

export { firebaseConfig as firebase };