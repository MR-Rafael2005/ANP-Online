/*
--SCRIPT ANTIGO
Esse é o script base provido por padrao pelo Firebase.
<script type="module">
    //ATUAL
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAc5eEZVgokTsGWgZC50bzZG38c2zpf5Tk",
      authDomain: "anp-tests.firebaseapp.com",
      databaseURL: "https://anp-tests-default-rtdb.firebaseio.com",
      projectId: "anp-tests",
      storageBucket: "anp-tests.firebasestorage.app",
      messagingSenderId: "174267400965",
      appId: "1:174267400965:web:9faaf6123638fca1dc6d6c",
      measurementId: "G-Y7TZ9MYPJ5"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
</script> 
*/

(function(){
 const firebaseConfig = {
      apiKey: "AIzaSyAc5eEZVgokTsGWgZC50bzZG38c2zpf5Tk",
      authDomain: "anp-tests.firebaseapp.com",
      databaseURL: "https://anp-tests-default-rtdb.firebaseio.com",
      projectId: "anp-tests",
      storageBucket: "anp-tests.firebasestorage.app",
      messagingSenderId: "174267400965",
      appId: "1:174267400965:web:9faaf6123638fca1dc6d6c",
      measurementId: "G-Y7TZ9MYPJ5"
    };

    firebase.initializeApp(firebaseConfig)
})()