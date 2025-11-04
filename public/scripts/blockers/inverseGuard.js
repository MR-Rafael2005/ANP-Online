//Se o usuário estiver autenticado, redirecione para a página de trabalho
firebase.auth().onAuthStateChanged(user => {
  if (user) 
  {
    window.location.href = "/pages/workspace/";
  } else {
    document.getElementById('loading').style.display = 'none';
  }
});