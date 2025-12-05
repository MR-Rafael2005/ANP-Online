function populateProfile(userData, user) {
    if (userData) 
    {
        if(document.getElementById("profileName"))
        {
            document.getElementById("profileName").value = userData.username || "N/A";
        }

        if(document.getElementById("profileEmail"))
        {
            document.getElementById("profileEmail").value = userData.email || "N/A";
        }
        
        if(document.getElementById("profileArea"))
        {
            document.getElementById("profileArea").value = userData.userArea || "N/A";
        }
        
        if(document.getElementById("profileRole"))
        {
            document.getElementById("profileRole").value = userData.userRole || "N/A";
        }
        
        if(document.getElementById("profileCreatedAt"))
        {
            document.getElementById("profileCreatedAt").value = user.metadata && user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : "N/A";
        }
        
        if(document.getElementById("profileLastLogin"))
        {
            document.getElementById("profileLastLogin").value = user.metadata && user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : "N/A";
        }

        if(document.getElementById("profilePhoto"))
        {
            if (userData.userPhoto) {
                document.getElementById("profilePhoto").src = userData.userPhoto;
            } else {
                document.getElementById("profilePhoto").src = '/assets/userDefaultW.png';
            }
        }
    } else {
        console.error("User data is undefined or null.");
    }
}

function loadProfile(user) {
    if (user) {
        const userId = user.uid;
        const cachedData = localStorage.getItem(`user_${userId}`);

        if (cachedData) {
            const userData = JSON.parse(cachedData);
            populateProfile(userData, user);
        } else {
            GetDocById('users', userId).then((doc) => {
                if (doc && doc.exists) {
                    const userData = doc.data();
                    populateProfile(userData, user);
                    setCacheUserData(userData, userId);
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }
}

function testeComVerificacao() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loadProfile(user, );
            }
        });
    } else {
        // Firebase ainda não está pronto, aguardar
        setTimeout(testeComVerificacao, 25);
    }
}

testeComVerificacao();