firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "/pages/workspace/";
  } else {

  }
});