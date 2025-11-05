//Verificar usuario e seu nivel de acesso
firebase.auth().onAuthStateChanged(async (user) => {
  if(user)
  {
    try {
        let userData = getCachedUserData(user.uid);
        if (userData) 
        {
            showElemets(userData);
        } else {
            userData = await GetDocByID("users", user.uid)
        }
    } catch (error) {
        alert("Erro ao obter dados do usuario")
        console.log("Erro para obter dados e verificar cargos")
    }
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

function showElemets(userData) 
{
    if (userData.role == "Administrador") 
    {
        let elements = document.getElementsByClassName("admin-only");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
        
        elements = document.getElementsByClassName("user-only");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
    } else if (userData.role == "Usuario") {
        const elements = document.getElementsByClassName("user-only");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
    }   
}