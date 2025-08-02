/*
--SCRIPT ANTIGO
<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDg60qnVK7bPIAUpKqOGMz6DI4QysKZuGo",
      authDomain: "anp-online-d3dfe.firebaseapp.com",
      projectId: "anp-online-d3dfe",
      storageBucket: "anp-online-d3dfe.firebasestorage.app",
      messagingSenderId: "562052850412",
      appId: "1:562052850412:web:5b3dc28eb74adf02ea3bc9",
      measurementId: "G-Y0779X11EX"
    };
  
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
</script> */

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