function loginOut(){
    firebase.auth().signOut().then(() => {
        window.location.href = "/";
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}