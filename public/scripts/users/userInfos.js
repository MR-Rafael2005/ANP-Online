function showInfos(user) 
{
    if (user) 
    {
        const cachedData = getCachedUserData(user.uid);
        
        if (cachedData)
        {
            console.log("Usando dados em cache para o usuário:", user.uid);
            setElementsData(cachedData);
            return;
        }

        GetDocByID("users", user.uid).then((userData) => {
            setElementsData(userData);
            setCacheUserData(userData, user.uid);
        }).catch((error) => {
            console.error("Erro ao obter dados do usuário:", error);
            alert("Erro ao obter dados do usuário: " + error.message);
        });
    }
}

function setElementsData(userData) 
{
    if (userData) 
    {
        Array.from(document.getElementsByClassName('user-name-place')).forEach(element => {
            element.textContent = userData.username || "N/A";
        });

        Array.from(document.getElementsByClassName('user-role-place')).forEach(element => {
            element.textContent = userData.userRole || "N/A";
        });
        Array.from(document.getElementsByClassName('user-area-place')).forEach(element => {
            element.textContent = userData.userArea || "N/A";
        });
        Array.from(document.getElementsByClassName('user-email-place')).forEach(element => {
            element.textContent = user.email;
        });

        Array.from(document.getElementsByClassName('user-photo-place')).forEach(element => {
            if (userData.userPhoto) {
                element.src = userData.userPhoto;
            } else {
                element.src = '/assets/userDefaultW.png';
            }
        });
    }

    Array.from(document.getElementsByClassName('user-createdAt-place')).forEach(element => {
        if (user.metadata && user.metadata.creationTime) {
            const createdAt = new Date(user.metadata.creationTime);
            element.textContent = createdAt.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } else {
            element.textContent = "N/A";
        }
    });
}


function setCacheUserData(userData, userId)
{
    if (userData && userId) 
    {
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    }
}

function clearUserCache(userId)
{
    if (userId) 
    {
        localStorage.removeItem(`user_${userId}`);
    }
}

function getCachedUserData(userId)
{
    if (userId) 
    {
        const data = localStorage.getItem(`user_${userId}`);
        return data ? JSON.parse(data) : null;
    }
}

// window.onload = function() {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             showInfos(user);
//         }
//     });
// };

function testeComVerificacao() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                showInfos(user);
            }
        });
    } else {
        // Firebase ainda não está pronto, aguardar
        setTimeout(testeComVerificacao, 25);
    }
}

testeComVerificacao();