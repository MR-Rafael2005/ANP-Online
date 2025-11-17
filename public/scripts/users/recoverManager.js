function recoverPass() {
    showLoading();
    const email = document.getElementById("emailLogin").value;

    firebase.auth().fetchSignInMethodsForEmail(email)
    .then((signInMethods) => {
        if (signInMethods.length === 0) {
            // Email não está cadastrado
            hideLoading();
            alert("Este email não está cadastrado no sistema.");
            return;
        }
        
        // Email existe, envia o reset
        return firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            hideLoading();
            alert("Email de recuperação enviado com sucesso! (VERIFIQUE SUA CAIXA DE SPAM!!!)");
        });
    })
    .catch((error) => {
        hideLoading();
        console.error("Erro ao enviar email de recuperação:", error);
        
        // Tratamento de erros específicos
        if (error.code === 'auth/invalid-email') {
            alert("Email inválido. Por favor, verifique o formato do email.");
        } else {
            alert("Erro ao enviar email de recuperação. Tente novamente mais tarde.");
        }
    });
}