function loginOut(){
    const userId = firebase.auth().currentUser.uid;

    firebase.auth().signOut().then(() => {
        clearUserCache(userId);
        window.location.href = "/";
    }).catch((error) => {
        console.error("Error signing out: ", error);
        alert("Erro ao sair.\nDetalhes: " + error.message);
    });
}