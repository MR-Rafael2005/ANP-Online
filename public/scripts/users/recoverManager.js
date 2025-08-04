function recoverPass() {
    showLoading();
    const email = document.getElementById("emailLogin").value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            hideLoading();
            alert("Email de recuperação enviado com sucesso! (VERIFIQUE SUA CAIXA DE SPAM!!!)");
        })
        .catch((error) => {
            hideLoading();
            alert("Erro ao enviar email de recuperação, verifique se ele foi digitado corretamente.");
            console.error("Erro ao enviar email de recuperação:", error);
        });
}