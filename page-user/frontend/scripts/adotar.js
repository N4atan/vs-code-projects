//Pegar o nome de usuário se houver alguem logado.
window.onload = function() {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    if (userLogged) {
        document.getElementById("user-identification").innerText = userLogged.username;  // Atualiza o nome do usuário na página
    }

    getPosts();
};

document.getElementById("fazer-postagem-btn").addEventListener("click", function(){
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(currentDate);
    
    if(userLogged){
        createPost("Midori - Gato Preto", userLogged.username, "Salvador, Bahia", formattedDate)
    } else {
        alert("Crie sua conta ou faça login!");
    }
})

async function getPosts(){
    try {
        const response = await axios.get("http://localhost:3000/posts")

        if(response.data.length > 0){
            const container = document.querySelector(".seccao-divs"); // O elemento onde as divs serão adicionadas

            console.log(response.data)
            
            response.data.forEach(animal => {
                const novaDiv = criarDivAnimal(
                    animal.id,
                    animal.nome, 
                    animal.usuario, 
                    animal.localizacao, 
                    animal.dataPostagem
                );
                container.appendChild(novaDiv);
            });
        }
    } catch (error) {
        console.log("Deu merda:", error)
    }
}

async function createPost(nome, usuario, localizacao, dataPostagem){
    try {
        const novoPost ={
            nome: nome,
            usuario: usuario,
            localizacao: localizacao,
            dataPostagem: dataPostagem
        }

        await axios.post("http://localhost:3000/posts", novoPost)
        console.log("Criado com sucesso!")
    } catch (error) {
        console.log("Deu merda pra criar: ", error)
    }

}

function criarDivAnimal(id, nome, usuario, localizacao, dataPostagem) {
    const divAnimal = document.createElement("div");
    divAnimal.classList.add("div-animal");
    divAnimal.dataset.id = id; // Armazena o ID do post

    divAnimal.innerHTML = `
        <div class="img-animal"></div>
        <div class="dados-animal">
            <label id="nome-animal">${nome}</label>
            <label id="postado-por">Publicado por ${usuario}</label>
            <label id="local">${localizacao}</label>
            <label id="data-postagem">${dataPostagem}</label>
        </div>
    `;

    // Adiciona um evento de clique para redirecionar à página de detalhes
    divAnimal.addEventListener("click", () => {
        window.location.href = `page-detalhes.html?id=${id}`;
    });

    return divAnimal;
}