const form = {
    username: () => document.getElementById('username'),
    email: () => document.getElementById('emailLogin'),
    password: () => document.getElementById('passwordLogin'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    userPhoto: () => document.getElementById('userPhoto'),
    submitButton: () => document.getElementById('submitButton'),
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

function createUser()
{
    if (!validateForm()) 
    {
        alert("Por favor, corrija os erros antes de enviar o formulário.");
        return false;
    }

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
/*
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
*/

    console.log("Dados do usuário:", userData);
    alert("Usuário criado com sucesso!(Simulação)");
    return true;
}

function registerUser(userData)
{
    /*
    Modelo de dados do usuário
    {  
        username: "Nome do usuário",
        email: "Email do usuário",
        password: "Senha do usuário",
        userPhoto: "Foto do usuário",
        userRole: "Função do usuário (ex: admin, user)"
        userId: "ID do usuário (gerado pelo Firebase)"
    }
    */ 

    const db = firebase.firestore();

}

/*
function convertToBase64(file) 
{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
*/

function convertToBase64(file, options = {}) {
    return new Promise((resolve, reject) => {
        // Image Config
        const config = {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8,
            maxFileSize: 500 * 1024, // 500KB 
            outputFormat: 'image/jpeg',
            ...options
        };

        // Verificar se o arquivo é muito grande para ser processado (10x o tamanho máximo permitido)
        if (file.size > config.maxFileSize * 10) 
        { 
            reject(new Error(`Arquivo muito grande. Máximo permitido: ${(config.maxFileSize / 1024).toFixed(0)}KB`));
            return;
        }

        // Verificar se é uma imagem
        if (!file.type.startsWith('image/')) {
            reject(new Error('Arquivo deve ser uma imagem'));
            return;
        }

        const reader = new FileReader();
        
        //Ao carregar o reader...
        reader.onload = (e) => {
            const img = new Image();
            
            //Ao carregar a imagem...
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Calcular novas dimensões mantendo a proporção
                    let { width, height } = img;
                    
                    if (width > config.maxWidth || height > config.maxHeight) 
                    {
                        const aspectRatio = width / height;
                        
                        if (width > height) {
                            width = config.maxWidth;
                            height = width / aspectRatio;
                            
                            if (height > config.maxHeight) {
                                height = config.maxHeight;
                                width = height * aspectRatio;
                            }
                        } else {
                            height = config.maxHeight;
                            width = height * aspectRatio;
                            
                            if (width > config.maxWidth) {
                                width = config.maxWidth;
                                height = width / aspectRatio;
                            }
                        }
                    }
                    
                    // Definir tamanho do canvas
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Melhorar qualidade da renderização
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    
                    // Desenhar imagem redimensionada
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Converter para Base64 com qualidade especificada
                    let base64Result = canvas.toDataURL(config.outputFormat, config.quality);
                    
                    // Verificar se ainda está muito grande e reduzir qualidade se necessário
                    let attempts = 0;
                    while (base64Result.length > config.maxFileSize * 1.37 && attempts < 5) { // 1.37 é o fator de conversão base64
                        config.quality -= 0.1;
                        if (config.quality < 0.1) config.quality = 0.1;
                        
                        base64Result = canvas.toDataURL(config.outputFormat, config.quality);
                        attempts++;
                    }
                    
                    // Verificar tamanho final
                    const finalSizeKB = (base64Result.length * 0.75) / 1024; // Aproximação do tamanho real
                    
                    resolve({
                        base64: base64Result,
                        originalSize: file.size,
                        finalSize: Math.round(finalSizeKB * 1024),
                        finalSizeKB: Math.round(finalSizeKB),
                        originalDimensions: { width: img.width, height: img.height },
                        finalDimensions: { width, height },
                        compressionRatio: Math.round((1 - (finalSizeKB * 1024) / file.size) * 100),
                        quality: config.quality
                    });
                    
                } catch (error) {
                    reject(new Error('Erro ao processar imagem: ' + error.message));
                }
            };
            
            img.onerror = () => {
                reject(new Error('Erro ao carregar imagem'));
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = (error) => {
            reject(new Error('Erro ao ler arquivo: ' + error.message));
        };
        
        reader.readAsDataURL(file);
    });
}