//Pegar o nome de usuário se houver alguem logado.
window.onload = async function() {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    if (userLogged) {
        document.getElementById("user-identification").innerText = userLogged.username;  // Atualiza o nome do usuário na página
    }
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); // Obtém o ID da URL

    if (id) {
        try {
            const response = await axios.get(`http://localhost:3000/posts`, {
                params: {
                    id: id
                }
            });

            const animal = response.data[0];
            
            document.getElementById("nome-animal").innerText = animal.nome;
            document.getElementById("postado-por").innerText = `Publicado por ${animal.usuario}`;
            document.getElementById("localizacao").innerText = animal.localizacao;
            document.getElementById("data-postagem").innerText = animal.dataPostagem;
        } catch (error) {
            console.log("Erro ao buscar detalhes:", error);
        }
    } else {
        console.log("Nenhum ID encontrado na URL.");
    }
};