window.onload = function() {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    if (userLogged) {
        document.getElementById("user-identification").innerText = userLogged.username;  // Atualiza o nome do usuário na página
    }
};