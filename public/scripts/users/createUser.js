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
    console.log("Password length: ", password.length);
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

    return;

    firebase.auth().createUserWithEmailAndPassword(form.email().value, form.password().value)
    .then((userCredential) => {
        /*
        User credential:

        */ 
        CreateDocWithId("usersData", userCredential.user.uid, {
            
        })
    })
    .catch((error) => {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao criar usuário: " + error.message);
    });

    /*

    const photoFile = convertToBase64(form.userPhoto().files[0]);
    if (!photoFile) 
    {
        alert("Erro ao processar a foto do usuário.");
        return false;
    }

    const userData = {
        username: form.username().value,
        email: form.email().value,
        password: form.password().value,
        confirmPassword: form.confirmPassword().value,
        userPhoto: photoFile
    };
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;
            console.log("Usuário criado com sucesso:", user);
            // Aqui você pode adicionar lógica para salvar os dados adicionais do usuário no Firestore ou em outro lugar
        })
        .catch((error) => {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário: " + error.message);
        });
        
        console.log("Dados do usuário:", userData);
        alert("Usuário criado com sucesso!(Simulação)");
        */
    return true;
}