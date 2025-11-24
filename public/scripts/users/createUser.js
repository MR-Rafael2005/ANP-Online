const form = {
    username: () => document.getElementById('username'),
    email: () => document.getElementById('emailLogin'),
    password: () => document.getElementById('passwordLogin'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    userPhoto: () => document.getElementById('userPhoto'),
    submitButton: () => document.getElementById('submitButton'),
    userRole: () => document.getElementById('userRole'),
    userArea: () => document.getElementById('userArea')
}

//Validação de email
function validEmail() 
{
    const email = form.email().value;

    if (!email) {
        if (document.getElementById("emailError")) 
        {
            document.getElementById("emailError").style.display = "block";
            return false;
        }
    }
    
    //Verificação de formato de email por mascara regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) 
    {
        if (document.getElementById("emailError")) 
        {
            document.getElementById("emailError").style.display = "block";
            return false;
        }
    }

    if (document.getElementById("emailError")) 
    {
        document.getElementById("emailError").style.display = "none";
    }

    return re.test(String(email).toLowerCase());
}

//Validação de nome de usuário
//Nome deve ter pelo menos 3 caracteres
function validName() 
{
    const username = form.username().value;
    if (!username) 
    {
        if (document.getElementById("nameError")) 
        {
            document.getElementById("nameError").style.display = "block";
            return false;
        }
    }
    
    if (username.length < 3) 
    {
        if (document.getElementById("nameError")) 
        {
            document.getElementById("nameError").style.display = "block";
            return false;
        }
    }
    
    if (document.getElementById("nameError")) 
    {
        document.getElementById("nameError").style.display = "none";
    }

    return true;
}

//Validação de senha
//Senha deve ter pelo menos 6 caracteres
function validatePassword() 
{
    validateRePass();

    const password = form.password().value;
    if (!password) 
    {
        if (document.getElementById("passwordError")) 
        {
            document.getElementById("passwordError").style.display = "block";
            return false;
        }
    }

    if (password.length < 6) 
    {
        if (document.getElementById("passwordError")) 
        {
            document.getElementById("passwordError").style.display = "block";
            return false;
        }
    }

    if (document.getElementById("passwordError")) 
    {
        document.getElementById("passwordError").style.display = "none";
    }

    return true;
}

//Validação de confirmação de senha
function validateRePass() 
{
    const password = form.password().value;
    const rePass = form.confirmPassword().value;
    const errorElement = document.getElementById("rePassError");

    if (password !== rePass && rePass !== "") 
    {
        if (errorElement) 
        {
            errorElement.style.display = "block";
        }

        return false;
    }

    if (errorElement) 
    {
        errorElement.style.display = "none";
    }

    return true;
}


//Validação de foto do usuário 
function validatePhoto() 
{
    const userPhoto = form.userPhoto().value;
    if (userPhoto) 
    {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(userPhoto)) 
        {
            if (document.getElementById("photoError"))
            {
                document.getElementById("photoError").style.display = "block";
            }
            return false;
        }
    }

    if (document.getElementById("photoError")) 
    {
        document.getElementById("photoError").style.display = "none";
    }

    return true;
}

function photoChange()
{
    validateForm();

    if (!validatePhoto())
    {
        if (document.getElementById("photoPreview")) 
        {
            document.getElementById("photoPreview").style.display = "none";
        }
        return;
    }

    const userPhoto = form.userPhoto().files[0];
    if (userPhoto) 
    {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoPreview = document.getElementById("photoPreview");

            if (!photoPreview) 
            {
                console.error("Element with id 'photoPreview' not found.");
                return;
            }

            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";
        };
        reader.readAsDataURL(userPhoto);
    } else {
        if (document.getElementById("photoPreview")) 
        {
            document.getElementById("photoPreview").src = "";
            document.getElementById("photoPreview").style.display = "none";
        }
    }
}

function validateForm() 
{
    //Requisitos de validação
    /*
    - Email válido
    - Nome com pelo menos 3 caracteres
    - Senha com pelo menos 6 caracteres
    - Senha e confirmação de senha devem coincidir
    - Foto do usuário deve ser um arquivo de imagem (jpg, jpeg, png) 
    */
    const isValidEmail = validEmail();
    const isValidName = validName();
    const isValidPassword = validatePassword();
    const isValidRePass = validateRePass();
    const isValidPhoto = validatePhoto();

    if (isValidEmail && isValidName && isValidPassword && isValidRePass && isValidPhoto) 
    {
        form.submitButton().disabled = false;
        return true;
    } else {
        form.submitButton().disabled = true;
        return false;
    }
}

async function createUser() 
{
    showLoading();

    if (!validateForm()) 
    {
        alert("Por favor, corrija os erros antes de enviar o formulário.");
        return false;
    }

    /* Teste de dados
    try 
    {
        const photo64 = form.userPhoto().files[0] ? await convertToBase64(form.userPhoto().files[0]) : null;
        
        const userData = {
            email: form.email().value,
            password: form.password().value,
            username: form.username().value,
            userRole: form.userRole().value,
            userPhoto: photo64 ? photo64.base64 : null,
            userArea: form.userArea().value
        };
        
        console.log("Dados do usuário:", userData);
    } catch (error) {
        console.error("Erro ao processar a foto do usuário:", error);
        alert("Erro ao processar a foto do usuário: " + error.message);
    }
    */
    let photo64 = null;
    try 
    {
        photo64 = form.userPhoto().files[0] ? await convertToBase64(form.userPhoto().files[0]) : null;
    } catch (error) {
        console.error("Erro ao processar a foto do usuário:", error);
        alert("Erro ao processar a foto do usuário, tente outra imagem.\n Details:" + error.message);
        hideLoading();
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(form.email().value, form.password().value)
    .then(async (userCredential) => {
        
        /* User credential:
            uid
            email
            emailVerified
            isAnonymous
            metadata
            phoneNumber
            photoURL
            providerData
            refreshToken
            tenantId
        */

        try{
            // Salvar dados adicionais do usuário no Firestore
            await CreateDocWithId("users", userCredential.user.uid, {
                username: form.username().value,
                email: form.email().value,
                userRole: form.userRole().value,
                userPhoto: photo64 ? photo64.base64 : null,
                userArea: form.userArea().value
            });

            alert("Usuário criado com sucesso!");
            hideLoading();
            window.location.href = "/pages/workspace/index.html";
        } catch (error) {
            console.error("Erro ao salvar dados do usuário no Firestore:", error);
            
            // REVERTER: Excluir usuário do Firebase Auth
            try {
                await userCredential.user.delete();
                console.log("Usuário removido do Auth devido ao erro no Firestore");
                alert("Erro ao criar conta. Tente novamente.\nDetalhes: " + error.message);
            } catch (deleteError) {
                console.error("Erro crítico!!!: Não foi possível reverter usuário:", deleteError);
                alert("Erro crítico na criação da conta. Entre em contato com o suporte.");
            }
            
            hideLoading();
        }
    }).catch((error) => {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao criar usuário: " + error.message);
        hideLoading();
        return;
    });

}