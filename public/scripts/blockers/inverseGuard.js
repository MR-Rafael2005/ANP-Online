//Se o usuário estiver autenticado, redirecione para a página de trabalho
firebase.auth().onAuthStateChanged(user => {
  if (user) 
  {
    const cachedData = getCachedUserData(user.uid);
    if (cachedData)
    {
      window.location.href = "/pages/workspace/";
    }
  } else {
    hideLoading();
  }
});

function getCachedUserData(userId)
{
    if (userId) 
    {
        const data = localStorage.getItem(`user_${userId}`);
        return data ? JSON.parse(data) : null;
    }
}