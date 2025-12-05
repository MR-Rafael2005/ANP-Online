function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem.');
            return;
        }
        
        // Validar tamanho (ex: máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB.');
            return;
        }
        
        // Preview da imagem
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePhoto').src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        console.log('Arquivo selecionado:', file.name);
        // Aqui você pode adicionar a lógica para upload para Firebase Storage
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

async function saveChanges()
{
    try {
        user = firebase.auth().currentUser;
        oldData = getCachedUserData(user.uid);

        if (!oldData)
        {
            oldData = await GetDataByID("users", user.uid);
        }
        
        const userData = oldData;
        userData.username = document.getElementById("profileName").value;
        userData.userArea = document.getElementById("profileArea").value;
        let photo64 = document.getElementById("photoInput").files[0] ? await convertToBase64(document.getElementById("photoInput").files[0]) : null;
        userData.userPhoto = photo64 ? photo64.base64 : userData.userPhoto;
        
        UpdateDocById("users", user.uid, userData).then(() => {
            // Atualizar o cache local
            setCacheUserData(userData, user.uid);
            alert("Alterações salvas com sucesso!");
            document.location.reload();
        }).catch((error) => {
            console.error("Erro ao salvar alterações do perfil:", error);
            alert("Erro ao salvar alterações do perfil: " + error.message);
        });
    } catch (error) {
        alert("Erro ao salvar alterações do perfil: " + error.message);
    }
}