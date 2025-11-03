//Se o usuário não estiver autenticado, redirecione para a página de login
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "/pages/users/";
  }
});