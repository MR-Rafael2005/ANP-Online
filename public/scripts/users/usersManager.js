function makeLogin() {
    const userEmail = document.getElementById("emailLogin").value;
    const userPassword = document.getElementById("passwordLogin").value;
    console.log("Attempting to login with email:", userEmail);

    showLoading();

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
        console.log("Login successful:", userCredential);
        window.location.href = "../workspace/index.html";
        hideLoading();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during login:", errorCode, errorMessage);
        alert("Erro ao fazer login: senha ou email inválidos");
        hideLoading();
    });
}

function validateButton() {
    const loginBtn = document.getElementById("loginBtn");
    const password = document.getElementById("passwordLogin").value;

    loginBtn.disabled = password.length <= 0 || !validEmail();
    console.log("Login button validation: ", loginBtn.disabled);
}

function validEmail() {
    const email = document.getElementById("emailLogin").value;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!re.test(email)) {
        if (document.getElementById("emailError")) 
        {
            document.getElementById("emailError").style.display = "block";
            return false;
        }

        alert("Email inválido");
    }

    if (document.getElementById("emailError")) 
    {
        document.getElementById("emailError").style.display = "none";
    }
    
    return re.test(email);
}

function makeRecover() {
    const userEmail = document.getElementById("emailLogin").value;
    if (!validEmail()) {
        return;
    }
}

// function validadeRePass()
// {
//     const password = document.getElementById("passwordLogin").value;
//     const rePass = document.getElementById("confirmPassword").value;

//     if (password !== rePass) {
//         console.log(password, rePass);
//         document.getElementById("rePassError").style.display = "block";
//         return false;
//     }

//     document.getElementById("rePassError").style.display = "none";
//     return true;
// }

function validadeRePass() {
    const password = document.getElementById("passwordLogin").value;
    const rePass = document.getElementById("confirmPassword").value;
    const errorElement = document.getElementById("rePassError");

    if (password !== rePass && rePass !== "") {
        errorElement.style.display = "block";
        return false;
    }

    errorElement.style.display = "none";
    return true;
}